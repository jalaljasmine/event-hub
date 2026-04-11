from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os, json, uuid
from datetime import datetime

FRONTEND = os.path.join(os.path.dirname(__file__), '..', 'frontend')
app = Flask(__name__, static_folder=FRONTEND, static_url_path='')
CORS(app)

DB_FILE = os.path.join(os.path.dirname(__file__), 'db.json')

def load_db():
    if not os.path.exists(DB_FILE):
        return {"users": [], "tickets": [], "events": [], "reviews": {}}
    with open(DB_FILE) as f:
        data = json.load(f)
    data.setdefault("events",  [])
    data.setdefault("reviews", {})
    return data

def save_db(db):
    with open(DB_FILE, 'w') as f:
        json.dump(db, f, indent=2)

@app.route('/')
def index():
    return send_from_directory(FRONTEND, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(FRONTEND, path)

# AUTH
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    db   = load_db()
    if any(u['email'] == data['email'] for u in db['users']):
        return jsonify({"success": False, "message": "Email already registered."})
    user = {
        "id": str(uuid.uuid4()), "firstName": data.get('firstName',''),
        "lastName": data.get('lastName',''), "email": data['email'],
        "institution": data.get('institution',''), "password": data['password'],
        "role": data.get('role','attendee'), "createdAt": datetime.now().isoformat()
    }
    db['users'].append(user)
    save_db(db)
    safe = {k:v for k,v in user.items() if k != 'password'}
    return jsonify({"success": True, "user": safe})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    db   = load_db()
    user = next((u for u in db['users']
                 if u['email'] == data['email'] and u['password'] == data['password']
                 and u.get('role','attendee') == data.get('role','attendee')), None)
    if not user:
        return jsonify({"success": False, "message": "Invalid email, password, or role."})
    safe = {k:v for k,v in user.items() if k != 'password'}
    return jsonify({"success": True, "user": safe})

# ORGANIZER EVENTS
@app.route('/events', methods=['GET'])
def get_events():
    db     = load_db()
    email  = request.args.get('organizer')
    events = db.get('events', [])
    if email:
        events = [e for e in events if e.get('organizer') == email]
    return jsonify({"success": True, "events": events})

@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    db   = load_db()
    event = {
        "id": 'org_' + str(uuid.uuid4())[:8],
        "title": data.get('title'), "category": data.get('category','music'),
        "date": data.get('date'), "time": data.get('time'),
        "location": data.get('location'), "price": data.get('price', 0),
        "capacity": data.get('capacity', 100), "description": data.get('description',''),
        "image": data.get('image','event1.jpg'), "organizer": data.get('organizer'),
        "createdAt": datetime.now().isoformat()
    }
    db['events'].append(event)
    save_db(db)
    return jsonify({"success": True, "event": event})

@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.json
    db   = load_db()
    idx  = next((i for i,e in enumerate(db['events']) if e['id'] == event_id), None)
    if idx is None:
        return jsonify({"success": False, "message": "Event not found."})
    db['events'][idx].update(data)
    save_db(db)
    return jsonify({"success": True})

@app.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    db = load_db()
    db['events'] = [e for e in db['events'] if e['id'] != event_id]
    save_db(db)
    return jsonify({"success": True})

# BOOKING
@app.route('/book-ticket', methods=['POST'])
def book_ticket():
    data = request.json
    db   = load_db()
    event_id = data.get('eventId')
    ev = next((e for e in db.get('events',[]) if str(e['id']) == str(event_id)), None)
    if ev:
        booked = len([t for t in db['tickets'] if str(t.get('eventId')) == str(event_id)])
        if booked >= ev.get('capacity', 999):
            return jsonify({"success": False, "full": True, "message": "Event is fully booked."})
    ticket = {
        "ticketId": "TKT" + str(uuid.uuid4())[:6].upper(),
        "email": data.get('email'), "eventId": event_id,
        "title": data.get('title'), "date": data.get('date'),
        "time": data.get('time'), "location": data.get('location'),
        "price": data.get('price'), "paymentId": data.get('paymentId',''),
        "seatNum": data.get('seatNum',''), "bookedOn": datetime.now().isoformat()
    }
    db['tickets'].append(ticket)
    save_db(db)
    return jsonify({"success": True, "ticketId": ticket['ticketId']})

@app.route('/my-tickets', methods=['GET'])
def my_tickets():
    email   = request.args.get('email')
    db      = load_db()
    tickets = [t for t in db['tickets'] if t.get('email') == email]
    return jsonify({"success": True, "tickets": tickets})

# REVIEWS
@app.route('/reviews/<event_id>', methods=['GET'])
def get_reviews(event_id):
    db      = load_db()
    reviews = db.get('reviews', {}).get(event_id, [])
    return jsonify({"success": True, "reviews": reviews})

@app.route('/reviews/<event_id>', methods=['POST'])
def add_review(event_id):
    data = request.json
    db   = load_db()
    if 'reviews' not in db: db['reviews'] = {}
    if event_id not in db['reviews']: db['reviews'][event_id] = []
    db['reviews'][event_id].insert(0, {
        "name": data.get('name','Anonymous'), "rating": data.get('rating', 5),
        "text": data.get('text',''), "date": datetime.now().strftime('%d %b %Y')
    })
    save_db(db)
    return jsonify({"success": True})

# AI ASSISTANT
@app.route('/ask-grok', methods=['POST'])
def ask_grok():
    msg     = request.json.get('message', '').lower()
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if api_key:
        try:
            import urllib.request as ur
            payload = json.dumps({
                "model": "claude-haiku-4-5-20251001", "max_tokens": 300,
                "system": "You are EventHub's AI assistant for Vijayawada, AP. Help users find events. Be concise and friendly. Use emojis.",
                "messages": [{"role":"user","content": msg}]
            }).encode()
            req = ur.Request('https://api.anthropic.com/v1/messages', data=payload,
                headers={'Content-Type':'application/json','x-api-key':api_key,'anthropic-version':'2023-06-01'})
            with ur.urlopen(req, timeout=10) as r:
                return jsonify({"reply": json.loads(r.read())['content'][0]['text']})
        except: pass

    replies = {
        'family': "🎉 Family picks:\n• Food & Culture Fest – Rajiv Gandhi Park (₹150)\n• Spice Food Trail – ₹120",
        'music':  "🎵 Music events:\n• National Music Festival – May 30 (₹499)\n• Alternative Waves Fest – Jul 12 (₹550)",
        'tech':   "💻 Tech events:\n• TechFest 2026 – Jun 20 (₹299)\n• Startup Summit – Jul 8 (₹199)",
        'jazz':   "🎷 Jazz After Dark – May 28 at PWD Grounds (₹350). Limited seats!",
        'cheap':  "💰 Budget picks:\n• Spice Food Trail ₹120 • Food Fest ₹150 • Startup Summit ₹199",
        'sport':  "⚽ Cricket Premier League – Jun 15, Indira Gandhi Stadium (₹400)",
        'food':   "🍕 Food events:\n• Food & Culture Fest – Jun 5 (₹150)\n• Spice Food Trail – May 25 (₹120)",
    }
    for key, reply in replies.items():
        if key in msg: return jsonify({"reply": reply})
    return jsonify({"reply": f"🤖 Try asking about music, jazz, tech, food, sports, family events in Vijayawada!"})

if __name__ == '__main__':
    print("✅ EventHub running → http://127.0.0.1:5000")
    print("💡 Set ANTHROPIC_API_KEY for real AI")
    app.run(debug=True, port=5000)
