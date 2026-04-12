// ── EVENT DATA ─────────────────────────────────────────────────────────────
const ALL_EVENTS = [
    { id:1,  title:"National Music Festival",   category:"music",    date:"May 30, 2026", time:"6:00 PM",  location:"Siddhartha Amphitheatre, Vijayawada", price:499,  capacity:200, image:"event1.jpg" },
    { id:2,  title:"Symphony of Sound",         category:"classical",date:"Jun 10, 2026", time:"7:30 PM",  location:"Tummalapalli Kalakshetram, Vijayawada",price:750,  capacity:150, image:"event2.jpg" },
    { id:3,  title:"Jazz After Dark",           category:"jazz",     date:"May 28, 2026", time:"8:00 PM",  location:"PWD Grounds, Vijayawada",            price:350,  capacity:100, image:"event3.jpg" },
    { id:4,  title:"Hip-Hop Nation Tour",       category:"hiphop",   date:"Jul 1, 2026",  time:"7:00 PM",  location:"IGMC Stadium, Vijayawada",            price:899,  capacity:500, image:"event4.jpg" },
    { id:5,  title:"TechFest Vijayawada 2026",  category:"tech",     date:"Jun 20, 2026", time:"9:00 AM",  location:"SRM University, Vijayawada",          price:299,  capacity:300, image:"event5.jpg" },
    { id:6,  title:"Food & Culture Fest",       category:"food",     date:"Jun 5, 2026",  time:"11:00 AM", location:"Rajiv Gandhi Park, Vijayawada",       price:150,  capacity:400, image:"event6.jpg" },
    { id:7,  title:"Cricket Premier League",    category:"sports",   date:"Jun 15, 2026", time:"3:00 PM",  location:"Indira Gandhi Stadium, Vijayawada",   price:400,  capacity:1000,image:"event7.jpg" },
    { id:8,  title:"Alternative Waves Fest",    category:"music",    date:"Jul 12, 2026", time:"5:00 PM",  location:"Bhavani Island, Vijayawada",          price:550,  capacity:250, image:"event1.jpg" },
    { id:9,  title:"Startup Summit 2026",       category:"tech",     date:"Jul 8, 2026",  time:"9:30 AM",  location:"VUDA Community Hall, Vijayawada",     price:199,  capacity:180, image:"event9.jpg" },
    { id:10, title:"Classical Fusion Night",    category:"classical",date:"Jun 25, 2026", time:"7:00 PM",  location:"Punnami Ghat Grounds, Vijayawada",    price:600,  capacity:120, image:"event2.jpg" },
    { id:11, title:"Spice Food Trail",          category:"food",     date:"May 25, 2026", time:"10:00 AM", location:"Kanaka Durga Road, Vijayawada",       price:120,  capacity:350, image:"event6.jpg" },
    { id:12, title:"Dance Mania Championship",  category:"music",    date:"Jul 20, 2026", time:"4:00 PM",  location:"JNTU Auditorium, Vijayawada",         price:250,  capacity:220, image:"event12.jpg"},
];
// ── STATE ──────────────────────────────────────────────────────────────────
let pendingBooking = null;
let showingAll = false;
let currentFilter = 'all';

// ── STORAGE HELPERS ────────────────────────────────────────────────────────
const getUser    = () => JSON.parse(localStorage.getItem('eventhub_user')      || 'null');
const getFavs    = () => JSON.parse(localStorage.getItem('eventhub_favorites') || '[]');
const getTickets = () => JSON.parse(localStorage.getItem('eventhub_tickets')   || '[]');
const getNotifs  = () => JSON.parse(localStorage.getItem('eventhub_notifs')    || '[]');
const saveFavs   = f => localStorage.setItem('eventhub_favorites', JSON.stringify(f));
const saveTickets= t => localStorage.setItem('eventhub_tickets',   JSON.stringify(t));
const saveNotifs = n => localStorage.setItem('eventhub_notifs',    JSON.stringify(n));
const getBookedCount = (eventId) =>
    getTickets().filter(t => Number(t.eventId) === Number(eventId)).length;

const isSoldOut = (ev) => getBookedCount(ev.id) >= ev.capacity;

const seatsLeft = (ev) => Math.max(ev.capacity - getBookedCount(ev.id), 0);

// ── WELCOME ────────────────────────────────────────────────────────────────
function checkWelcome() {
    const overlay = document.getElementById('welcomeOverlay');
    if (!overlay) return;
    overlay.style.display = localStorage.getItem('eventhub_visited') ? 'none' : 'flex';
}
function getStarted() {
    localStorage.setItem('eventhub_visited', '1');
    document.getElementById('welcomeOverlay').style.display = 'none';
    window.location.href = 'login.html';
}
function continueAsGuest() {
    localStorage.setItem('eventhub_visited', '1');
    document.getElementById('welcomeOverlay').style.display = 'none';
}

// ── AUTH UI ────────────────────────────────────────────────────────────────
function updateAuthUI() {
    const user = getUser();
    const authBtn   = document.getElementById('authBtn');
    const bnavAvatar= document.getElementById('bnavAvatar');
    if (!authBtn) return;
    if (user) {
        const initials = ((user.firstName || '')[0] || (user.email[0] || 'U')).toUpperCase();
        authBtn.innerHTML = `
            <div onclick="goToProfile()" class="user-chip">
                <div class="user-chip-avatar">${initials}</div>
                <span>${user.firstName || 'Me'}</span>
            </div>`;
        if (bnavAvatar) {
            bnavAvatar.textContent = initials;
            bnavAvatar.style.background = 'linear-gradient(135deg,#7b61ff,#00c9a7)';
            bnavAvatar.style.fontSize   = '14px';
        }
    } else {
        authBtn.innerHTML = `
            <a href="login.html" class="btn-login">Login</a>
            <a href="login.html" class="btn-signup">Get Started</a>`;
    }
}

// ── BADGES ─────────────────────────────────────────────────────────────────
function updateBadges() {
    const favs   = getFavs();
    const notifs = getNotifs().filter(n => !n.read);

    const favBadge    = document.getElementById('favBadge');
    const bnavFavBadge= document.getElementById('bnavFavBadge');
    const notifBadge  = document.getElementById('notifBadge');

    if (favBadge)    { favBadge.textContent    = favs.length;   favBadge.style.display    = favs.length > 0   ? 'flex' : 'none'; }
    if (bnavFavBadge){ bnavFavBadge.textContent = favs.length;  bnavFavBadge.style.display = favs.length > 0  ? 'flex' : 'none'; }
    if (notifBadge)  { notifBadge.textContent   = notifs.length; notifBadge.style.display  = notifs.length > 0 ? 'flex' : 'none'; }
}

// ── IMAGE FALLBACK ─────────────────────────────────────────────────────────
function imgError(el) {
    el.style.display = 'none';
    el.parentElement.style.background = 'linear-gradient(135deg,#1e1040,#0d2b3e)';
}

// ── RENDER CARDS ───────────────────────────────────────────────────────────
  function makeHCard(ev) {
    const isFav = getFavs().includes(ev.id);
    const full = isSoldOut(ev);

    return `
        <div class="ev-card-h">
            <div class="ev-img-wrap">
                <img src="${ev.image}" alt="${ev.title}" onerror="imgError(this)"/>
                <button class="fav-overlay ${isFav ? 'faved' : ''}" onclick="toggleFav(${ev.id},this)">${isFav ? '❤️' : '🤍'}</button>
            </div>
            <div class="ev-body">
                <div class="tag-pill">${ev.category.toUpperCase()}</div>
                <h3>${ev.title}</h3>
                <p class="ev-meta">📅 ${ev.date} • ${ev.time}</p>
                <p class="ev-meta">📍 ${ev.location}</p>
                <p class="ev-meta">🎫 ${full ? 'Sold out' : `${seatsLeft(ev)} / ${ev.capacity} seats left`}</p>
                <div class="ev-price">₹${ev.price}</div>
                <button class="ev-book-btn ${full ? 'sold-out' : ''}" onclick="openBooking(${ev.id})" ${full ? 'disabled' : ''}>
                    ${full ? 'Event Full' : 'Book Now'}
                </button>
            </div>
        </div>`;
}

function makeGridCard(ev) {
    const isFav = getFavs().includes(ev.id);
    const full = isSoldOut(ev);

    return `
        <div class="ev-card-grid">
            <div class="ev-img-wrap" style="height:180px;">
                <img src="${ev.image}" alt="${ev.title}" style="width:100%;height:180px;object-fit:cover;" onerror="imgError(this)"/>
                <button class="fav-overlay ${isFav ? 'faved' : ''}" onclick="toggleFav(${ev.id},this)">${isFav ? '❤️' : '🤍'}</button>
            </div>
            <div class="ev-card-body">
                <div class="tag-pill">${ev.category.toUpperCase()}</div>
                <h3>${ev.title}</h3>
                <p class="ev-meta">📅 ${ev.date} • ${ev.time}</p>
                <p class="ev-meta">📍 ${ev.location}</p>
                <p class="ev-meta">🎫 ${full ? 'Sold out' : `${seatsLeft(ev)} / ${ev.capacity} seats left`}</p>
                <div class="ev-price">₹${ev.price}</div>
                <button class="ev-book-btn ${full ? 'sold-out' : ''}" onclick="openBooking(${ev.id})" ${full ? 'disabled' : ''}>
                    ${full ? 'Event Full' : 'Book Now'}
                </button>
            </div>
        </div>`;
}
// ── RENDER ─────────────────────────────────────────────────────────────────
function renderAll(list) {
    const row  = document.getElementById('upcomingRow');
    const concerts= document.getElementById('concertsList');

    if (row) row.innerHTML = list.slice(0, 6).map(makeHCard).join('');

    if (concerts) {
        concerts.innerHTML = list.slice(0, 5).map(ev => `
            <div class="concert-row" onclick="openBooking(${ev.id})">
                <div class="concert-thumb">
                    <img src="${ev.image}" alt="${ev.title}" onerror="imgError(this)"/>
                </div>
                <div class="concert-info">
                    <h4>${ev.title}</h4>
                    <p>📅 ${ev.date} &nbsp;|&nbsp; 📍 ${ev.location.split(',')[0]}</p>
                </div>
                <div class="concert-price">₹${ev.price}</div>
            </div>`).join('');
    }
}
function renderMyTickets() {
    const user = getUser();
    const box = document.getElementById('ticketsList');
    if (!box) return;

    if (!user) {
        box.innerHTML = `<div class="empty-state">Please login to view tickets.</div>`;
        return;
    }

    const tickets = getTickets()
        .filter(t => t.email === user.email)
        .sort((a, b) => new Date(b.bookedOn) - new Date(a.bookedOn));

    if (!tickets.length) {
        box.innerHTML = `<div class="empty-state">No tickets yet.</div>`;
        return;
    }

    box.innerHTML = tickets.map(t => `
        <div class="ticket-card-ui">
            <div class="ticket-title">${t.title}</div>
            <div class="ticket-meta">📅 ${t.date} • ${t.time}</div>
            <div class="ticket-meta">📍 ${t.location}</div>
            <div class="ticket-meta">🎫 Ticket ID: ${t.ticketId}</div>
            <div class="ticket-meta">₹${t.price}</div>
        </div>
    `).join('');
}
window.addEventListener('load', renderMyTickets);

// ── FILTER ─────────────────────────────────────────────────────────────────
function filterCat(cat, btn) {
    currentFilter = cat;
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const filtered = cat === 'all' ? ALL_EVENTS : ALL_EVENTS.filter(e => e.category === cat);
    renderAll(filtered);
    if (showingAll) {
        const grid = document.getElementById('allEventsGrid');
        if (grid) grid.innerHTML = filtered.map(makeGridCard).join('');
    }
}

function liveSearch(q) {
    const lower   = q.toLowerCase();
    const filtered = lower
        ? ALL_EVENTS.filter(e => e.title.toLowerCase().includes(lower) || e.location.toLowerCase().includes(lower))
        : ALL_EVENTS;
    renderAll(filtered);
}

// ── SEE ALL TOGGLE ─────────────────────────────────────────────────────────
function toggleSeeAll() {
    showingAll = !showingAll;
    const grid    = document.getElementById('allEventsGrid');
    const row     = document.getElementById('upcomingRow');
    const btn     = document.getElementById('seeAllBtn');
    const filtered= currentFilter === 'all' ? ALL_EVENTS : ALL_EVENTS.filter(e => e.category === currentFilter);
    if (showingAll) {
        grid.classList.remove('hidden');
        row.style.display = 'none';
        if (btn) btn.textContent = 'Show Less';
        grid.innerHTML = filtered.map(makeGridCard).join('');
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        grid.classList.add('hidden');
        row.style.display = 'flex';
        if (btn) btn.textContent = 'See All';
    }
}

// ── FAVOURITES ─────────────────────────────────────────────────────────────
function toggleFav(id, btn) {
    let favs  = getFavs();
    const isFav = favs.includes(id);
    if (isFav) {
        favs = favs.filter(f => f !== id);
        btn.innerHTML = '🤍';
        btn.classList.remove('faved');
        showToast('Removed from favourites');
    } else {
        favs.push(id);
        btn.innerHTML = '❤️';
        btn.classList.add('faved');
        const ev = ALL_EVENTS.find(e => e.id === id);
        addNotif(`❤️ Added "${ev.title}" to favourites`);
        showToast('Added to favourites! ❤️');
    }
    saveFavs(favs);
    updateBadges();
}

function openFavs() { window.location.href = 'favourites.html'; }
function closeFavs()  { }

// ── NOTIFICATIONS ──────────────────────────────────────────────────────────
function addNotif(msg) {
    const notifs = getNotifs();
    // Prevent exact duplicate within last 10 seconds
    const recent = notifs[0];
    if (recent && recent.msg === msg) return;
    notifs.unshift({ msg, time: new Date().toLocaleTimeString(), read: false });
    saveNotifs(notifs.slice(0, 20));
    updateBadges();
}

function openNotif() { window.location.href = 'notifications.html'; }
function closeNotif() { }

// ── BOOKING ────────────────────────────────────────────────────────────────
function openBooking(id) {
    const user = getUser();
    if (!user) {
        if (confirm('Please login to book events. Go to login page?')) window.location.href = 'login.html';
        return;
    }

    const ev = ALL_EVENTS.find(e => e.id === id);
    if (!ev) return;

    if (isSoldOut(ev)) {
        showToast('This event is fully booked');
        return;
    }

    // Store event and redirect to payment page
    sessionStorage.setItem('pending_event', JSON.stringify(ev));
    window.location.href = 'payment.html';
}

async function confirmBooking() {
    if (!pendingBooking) return;

    const ev = pendingBooking;
    const user = getUser();
    const btn = document.querySelector('#bookingModal .btn-confirm');
    btn.disabled = true;
    btn.textContent = 'Booking...';

    try {
        const res = await fetch('http://127.0.0.1:5000/book-ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                eventId: ev.id,
                title: ev.title,
                date: ev.date,
                time: ev.time,
                location: ev.location,
                price: ev.price
            })
        });

        const data = await res.json();

        if (!res.ok || data.full) {
            showToast('Event is fully booked');
            closeModal();
            return;
        }

        const ticketId = data.ticketId || ('TKT' + Date.now().toString().slice(-6));
        const tickets = getTickets();
        tickets.push({ ...ev, ticketId, bookedOn: new Date().toLocaleDateString(), email: user.email });
        saveTickets(tickets);

        addNotif(`🎟️ Ticket booked for "${ev.title}" — ID: ${ticketId}`);
        closeModal();

        document.getElementById('ticketPreview').innerHTML = `
            <div style="text-align:left;font-size:13px;line-height:2;color:#aaaacc;">
                <strong style="color:#fff;font-size:15px;">${ev.title}</strong><br/>
                📅 ${ev.date} • ${ev.time}<br/>
                📍 ${ev.location}<br/>
                💵 ₹${ev.price}<br/>
                🎫 Seats: ${seatsLeft(ev)} / ${ev.capacity}<br/>
                🔖 Ticket ID: <strong style="color:#00c9a7;">${ticketId}</strong>
            </div>`;
        document.getElementById('successModal').classList.add('show');
        pendingBooking = null;

    } catch {
        const ticketId = 'TKT' + Date.now().toString().slice(-6);
        const tickets = getTickets();
        tickets.push({ ...ev, ticketId, bookedOn: new Date().toLocaleDateString(), email: user.email });
        saveTickets(tickets);
        addNotif(`🎟️ Ticket booked for "${ev.title}" — ID: ${ticketId}`);
        closeModal();

        document.getElementById('ticketPreview').innerHTML = `
            <div style="text-align:left;font-size:13px;line-height:2;color:#aaaacc;">
                <strong style="color:#fff;font-size:15px;">${ev.title}</strong><br/>
                📅 ${ev.date} • ${ev.time}<br/>
                📍 ${ev.location}<br/>
                💵 ₹${ev.price}<br/>
                🎫 Seats: ${seatsLeft(ev)} / ${ev.capacity}<br/>
                🔖 Ticket ID: <strong style="color:#00c9a7;">${ticketId}</strong>
            </div>`;
        document.getElementById('successModal').classList.add('show');
        pendingBooking = null;
    }

    btn.disabled = false;
    btn.textContent = 'Confirm & Book';
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('show');
    pendingBooking = null;
}

function closeSuccess() { document.getElementById('successModal').classList.remove('show'); }

// ── NAVIGATION ─────────────────────────────────────────────────────────────

function goToProfile() { window.location.href = 'profile.html'; }
function closeProfile() { }
function logout() {
    localStorage.removeItem('eventhub_user');
    window.location.href = 'index.html';
}
function openTickets() { window.location.href = 'tickets.html'; }
function closeTickets() { }
// ── AI ─────────────────────────────────────────────────────────────────────
async function getAISuggestion() {
    const input = document.getElementById('ai-input').value.trim();
    const box   = document.getElementById('ai-response');
    if (!input) return;
    box.textContent  = '⏳ Thinking...';
    box.style.display = 'block';
    try {
        const res  = await fetch('http://127.0.0.1:5000/ask-grok', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        box.textContent = data.reply;
    } catch {
        box.textContent = '⚠️ Server not running. Start Flask with: python backend/main.py';
    }
}

// ── TOAST ──────────────────────────────────────────────────────────────────
function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#00c9a7;color:#09090f;padding:10px 24px;border-radius:30px;font-weight:700;font-size:14px;z-index:9999;box-shadow:0 4px 20px rgba(0,201,167,0.4);pointer-events:none;white-space:nowrap;';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

// ── INIT ───────────────────────────────────────────────────────────────────
window.onload = function () {
    checkWelcome();
    updateAuthUI();
    updateBadges();
    renderAll(ALL_EVENTS);
};

