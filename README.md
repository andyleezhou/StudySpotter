# 📚 StudySpotter

StudySpotter is a full-stack web app for discovering, favoriting, and reviewing study-friendly places like cafes, libraries, and coworking spaces. Users can search by city or use their location to find nearby spots.

---

## ✨ Features

- 🔍 **Search by City** – Type a city name to explore study spots in that area.
- 📍 **Nearby Me** – Uses browser geolocation to suggest nearby study locations.
- ❤️ **Favorites** – Logged-in users can save favorite spots for quick access.
- 💬 **Comments & Ratings** – Users can rate and comment on spots they’ve visited.
- 🌐 **Google Maps** – Embedded map for each spot's detail page.

---

## 🛠 Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React + Vite           |
| Backend    | Node.js + Express      |
| Database   | MongoDB + Mongoose     |
| Auth       | LocalStorage-based     |
| APIs       | Google Maps (Geocode & Embed) |

---

## 🧪 Data Generation

StudySpotter includes scripts to generate realistic spot data across:

- Los Angeles
- San Francisco
- San Diego
- New York
- Seattle
- Chicago
- **Long Beach (50+ focused entries)**

---

## 🚀 Getting Started

### 1. Clone and install
```bash
git clone https://github.com/yourusername/studyspotter.git
cd studyspotter
npm install
```

### 2. Create .ENV file
```bash
MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Generate and Import Data
```bash
node scripts/generateLargeSpotDataset.js
node scripts/generateLongBeachSpots.js
node scripts/importSpotsLarge.js
node scripts/importLBSpots.js
```

### 4. Run Frontend + Backend
```bash
npm run dev (frontend)
cd /server
npm run dev (backend)
```

```bash
studyspotter/
├── server/          # Express backend
│   ├── routes/
│   ├── models/
│   └── scripts/
├── studyspotter/    # React frontend (Vite)
├── data/            # Mock spot data JSON
├── .env
└── README.md
```
