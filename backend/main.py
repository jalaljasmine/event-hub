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
        db = {
            "users": [],
            "tickets": [],
            "events": [
                { "id":1,  "title":"National Music Festival",   "category":"music",    "date":"May 30, 2026", "time":"6:00 PM",  "location":"Siddhartha Amphitheatre, Vijayawada", "price":499,  "capacity":200, "image":"event1.jpg" },
                { "id":2,  "title":"Symphony of Sound",         "category":"classical","date":"Jun 10, 2026", "time":"7:30 PM",  "location":"Tummalapalli Kalakshetram, Vijayawada","price":750,  "capacity":150, "image":"event2.jpg" },
                { "id":3,  "title":"Jazz After Dark",           "category":"jazz",     "date":"May 28, 2026", "time":"8:00 PM",  "location":"PWD Grounds, Vijayawada",            "price":350,  "capacity":100, "image":"event3.jpg" },
                { "id":4,  "title":"Hip-Hop Nation Tour",       "category":"hiphop",   "date":"Jul 1, 2026",  "time":"7:00 PM",  "location":"IGMC Stadium, Vijayawada",            "price":899,  "capacity":500, "image":"event4.jpg" },
                { "id":5,  "title":"TechFest Vijayawada 2026",  "category":"tech",     "date":"Jun 20, 2026", "time":"9:00 AM",  "location":"SRM University, Vijayawada",          "price":299,  "capacity":300, "image":"event5.jpg" },
                { "id":6,  "title":"Food & Culture Fest",       "category":"food",     "date":"Jun 5, 2026",  "time":"11:00 AM", "location":"Rajiv Gandhi Park, Vijayawada",       "price":150,  "capacity":400, "image":"event6.jpg" },
                { "id":7,  "title":"Cricket Premier League",    "category":"sports",   "date":"Jun 15, 2026", "time":"3:00 PM",  "location":"Indira Gandhi Stadium, Vijayawada",   "price":400,  "capacity":1000,"image":"event7.jpg" },
                { "id":8,  "title":"Alternative Waves Fest",    "category":"music",    "date":"Jul 12, 2026", "time":"5:00 PM",  "location":"Bhavani Island, Vijayawada",          "price":550,  "capacity":250, "image":"event1.jpg" },
                { "id":9,  "title":"Startup Summit 2026",       "category":"tech",     "date":"Jul 8, 2026",  "time":"9:30 AM",  "location":"VUDA Community Hall, Vijayawada",     "price":199,  "capacity":180, "image":"event9.jpg" },
                { "id":10, "title":"Classical Fusion Night",    "category":"classical","date":"Jun 25, 2026", "time":"7:00 PM",  "location":"Punnami Ghat Grounds, Vijayawada",    "price":600,  "capacity":120, "image":"event2.jpg" },
                { "id":11, "title":"Spice Food Trail",          "category":"food",     "date":"May 25, 2026", "time":"10:00 AM", "location":"Kanaka Durga Road, Vijayawada",       "price":120,  "capacity":350, "image":"event6.jpg" },
                { "id":12, "title":"Dance Mania Championship",  "category":"music",    "date":"Jul 20, 2026", "time":"4:00 PM",  "location":"JNTU Auditorium, Vijayawada",         "price":250,  "capacity":220, "image":"event12.jpg"}
            ],
            "tickets": [],
            "reviews": {}
        }
        return db
    with open(DB_FILE) as f:
        data = json.load(f)
    data.setdefault("events",  [])
    data.setdefault("tickets", [])
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
    
    # Enrich events with booked count
    tickets = db.get('tickets', [])
    for ev in events:
        ev['bookedCount'] = len([t for t in tickets if str(t.get('eventId')) == str(ev.get('id'))])
        ev['seatsLeft']   = max(0, ev.get('capacity', 0) - ev['bookedCount'])

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
    quantity = int(data.get('quantity', 1))
    
    ev = next((e for e in db.get('events',[]) if str(e['id']) == str(event_id)), None)
    if ev:
        booked = len([t for t in db['tickets'] if str(t.get('eventId')) == str(event_id)])
        if booked + quantity > ev.get('capacity', 999):
            return jsonify({"success": False, "full": True, "message": "Not enough seats available."})
    
    new_tickets = []
    for _ in range(quantity):
        ticket = {
            "ticketId": "TKT" + str(uuid.uuid4())[:6].upper(),
            "email": data.get('email'), "eventId": event_id,
            "title": data.get('title'), "date": data.get('date'),
            "time": data.get('time'), "location": data.get('location'),
            "price": data.get('price'), "paymentId": data.get('paymentId',''),
            "seatNum": data.get('seatNum',''), "bookedOn": datetime.now().isoformat()
        }
        db['tickets'].append(ticket)
        new_tickets.append(ticket)
    
    save_db(db)
    return jsonify({"success": True, "ticketId": new_tickets[0]['ticketId'], "count": quantity})

# Get real-time booked count for an event
@app.route('/get-booked-count/<event_id>', methods=['GET'])
def get_booked_count(event_id):
    db = load_db()
    booked = len([t for t in db.get('tickets', []) if str(t.get('eventId')) == str(event_id)])
    return jsonify({"success": True, "eventId": event_id, "booked": booked})

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
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os, json, uuid
from datetime import datetime

FRONTEND = os.path.join(os.path.dirname(__file__), '..', 'frontend')
app = Flask(__name__, static_folder=FRONTEND, static_url_path='')
CORS(app)

DB_FILE = os.path.join(os.path.dirname(__file__), 'db.json')

DEFAULT_EVENTS = [
    { "id":1,  "title":"National Music Festival",   "category":"music",    "date":"May 30, 2026", "time":"6:00 PM",  "location":"Siddhartha Amphitheatre, Vijayawada", "price":499,  "capacity":200, "image":"event1.jpg" },
    { "id":2,  "title":"Symphony of Sound",         "category":"classical","date":"Jun 10, 2026", "time":"7:30 PM",  "location":"Tummalapalli Kalakshetram, Vijayawada","price":750,  "capacity":150, "image":"event2.jpg" },
    { "id":3,  "title":"Jazz After Dark",           "category":"jazz",     "date":"May 28, 2026", "time":"8:00 PM",  "location":"PWD Grounds, Vijayawada",            "price":350,  "capacity":100, "image":"event3.jpg" },
    { "id":4,  "title":"Hip-Hop Nation Tour",       "category":"hiphop",   "date":"Jul 1, 2026",  "time":"7:00 PM",  "location":"IGMC Stadium, Vijayawada",            "price":899,  "capacity":500, "image":"event4.jpg" },
    { "id":5,  "title":"TechFest Vijayawada 2026",  "category":"tech",     "date":"Jun 20, 2026", "time":"9:00 AM",  "location":"SRM University, Vijayawada",          "price":299,  "capacity":300, "image":"event5.jpg" },
    { "id":6,  "title":"Food & Culture Fest",       "category":"food",     "date":"Jun 5, 2026",  "time":"11:00 AM", "location":"Rajiv Gandhi Park, Vijayawada",       "price":150,  "capacity":400, "image":"event6.jpg" },
    { "id":7,  "title":"Cricket Premier League",    "category":"sports",   "date":"Jun 15, 2026", "time":"3:00 PM",  "location":"Indira Gandhi Stadium, Vijayawada",   "price":400,  "capacity":1000,"image":"event7.jpg" },
    { "id":8,  "title":"Alternative Waves Fest",    "category":"music",    "date":"Jul 12, 2026", "time":"5:00 PM",  "location":"Bhavani Island, Vijayawada",          "price":550,  "capacity":250, "image":"event1.jpg" },
    { "id":9,  "title":"Startup Summit 2026",       "category":"tech",     "date":"Jul 8, 2026",  "time":"9:30 AM",  "location":"VUDA Community Hall, Vijayawada",     "price":199,  "capacity":180, "image":"event9.jpg" },
    { "id":10, "title":"Classical Fusion Night",    "category":"classical","date":"Jun 25, 2026", "time":"7:00 PM",  "location":"Punnami Ghat Grounds, Vijayawada",    "price":600,  "capacity":120, "image":"event2.jpg" },
    { "id":11, "title":"Spice Food Trail",          "category":"food",     "date":"May 25, 2026", "time":"10:00 AM", "location":"Kanaka Durga Road, Vijayawada",       "price":120,  "capacity":350, "image":"event6.jpg" },
    { "id":12, "title":"Dance Mania Championship",  "category":"music",    "date":"Jul 20, 2026", "time":"4:00 PM",  "location":"JNTU Auditorium, Vijayawada",         "price":250,  "capacity":220, "image":"event12.jpg"}
]

def load_db():
    if not os.path.exists(DB_FILE):
        return {
            "users": [],
            "tickets": [],
            "events": DEFAULT_EVENTS.copy(),
            "reviews": {}
        }

    with open(DB_FILE) as f:
        data = json.load(f)

    data.setdefault("users", [])
    data.setdefault("tickets", [])
    data.setdefault("events", [])
    data.setdefault("reviews", {})

    if not data["events"]:
        data["events"] = DEFAULT_EVENTS.copy()
        save_db(data)

    return data

def save_db(db):
    with open(DB_FILE, 'w') as f:
        json.dump(db, f, indent=2)