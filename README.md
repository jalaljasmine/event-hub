# EventHub - Modern Event Management System

![EventHub Banner](https://via.placeholder.com/1200x400/09090f/ffffff?text=EventHub+-+Discover+%26+Book+Events)

EventHub is a sleek, highly interactive Event Management System designed to seamlessly connect attendees with incredible events. Built with a beautiful dark-mode glassmorphic UI, it provides a comprehensive end-to-end flow from browsing events to generating live scannable QR-code tickets.

## ✨ Features

* **Beautiful Interactive UI:** Modern dark-mode aesthetic with smooth micro-animations, glassmorphism filtering, and responsive design.
* **Dual Roles (Attendee & Organizer):** Tailored experiences relying on user authentication.
* **Event Discovery:** Filter events by category (Music, Tech, Sports, etc.), grid/list view toggles, and live search functionality.
* **Real-time Seating/Capacity:** Dynamic tracking of available seats and sold-out states.
* **Ticket Generation:** Automatically generates a personalized ticket including a **Live Scannable QR Code** ready for event entry.
* **Smart Notifications:** In-app notification center that alerts users instantly upon booking.
* **Favourites System:** Easily heart/save events to follow and keep them pinned in a dedicated Favourites tab.
* **Persistent Data:** Real backend integration utilizing Python & Flask running a persistent `db.json` data store.

## 🛠️ Tech Stack

**Frontend:**
* HTML5 / CSS3 (Custom Styling, No Heavy CSS Frameworks)
* Vanilla JavaScript (ES6+)
* External QR API integration (`api.qrserver.com`)

**Backend:**
* Python 3.x
* Flask (API routing & logical validation)

**Database:**
* File-based JSON Database (`db.json`) for lightweight persistence without the need for external setups.

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
* [Python 3.8+](https://www.python.org/downloads/) installed.
* Ensure you have `pip` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/EventHub.git
   cd EventHub
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```

3. **Install the required Python Packages:**
   ```bash
   pip install -r requirements.txt
   ```
   *(Ensure Flask and its related dependencies are installed)*

4. **Run the Flask Server:**
   ```bash
   python main.py
   ```

5. **Access the Application:**
   * Open your favorite web browser (Chrome, Edge, Firefox, etc.)
   * Go to: **`http://127.0.0.1:5000/`**
   * *Note: Always access the site through the localhost port rather than double-clicking the raw HTML files so that backend features work correctly.*

## 📸 Screenshots

*(Replace these links with actual screenshots of your application)*

| Browse Events | My Profile & Stats |
| --- | --- |
| ![Browse](https://via.placeholder.com/400x250/09090f/00c9a7?text=Browse+Page) | ![Profile](https://via.placeholder.com/400x250/09090f/ff6b35?text=Profile+Page) |

| Live QR Tickets | Favorites |
| --- | --- |
| ![Tickets](https://via.placeholder.com/400x250/09090f/7b61ff?text=Tickets+Page) | ![Favorites](https://via.placeholder.com/400x250/09090f/f72585?text=Favorites+Page) |

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/yourusername/EventHub/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
