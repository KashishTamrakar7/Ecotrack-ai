# 🌿 EcoTrack AI

EcoTrack AI is a smart sustainability platform designed to improve urban waste management using AI, real-time tracking, and location-based recycling insights.

It helps users classify waste using AI, find nearby recycling centers, and visualize smart bin data through an interactive dashboard.

---

## 🚀 Features

- ♻️ AI-based waste classification (Google Gemini API)
- 📍 Find nearby recycling centers using Google Maps API
- 🗑️ Smart bin level tracking (IoT simulation engine)
- 📊 Analytics dashboard with Chart.js
- 🔐 Authentication and secure data storage using Firebase
- ☁️ Real-time database updates with Firestore

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14 (App Router), Tailwind CSS  
**Backend & Database:** Firebase Auth, Firestore, Firebase Storage  
**AI Integration:** Google Gemini API (gemini-2.0-flash)  
**Maps:** Google Maps Platform + Distance Matrix API  
**Charts:** Chart.js + react-chartjs-2  
**IoT Simulation:** Custom iotEngine.js


---

## 💡 Problem Statement

Modern cities struggle with inefficient waste segregation, lack of recycling awareness, and poor real-time monitoring of waste systems.

EcoTrack AI addresses these issues using AI-driven classification and smart city data visualization.

---

## 🎯 Impact

- Encourages proper waste segregation habits
- Improves access to recycling information
- Supports smart city infrastructure
- Promotes environmental sustainability

---

## ⚡ Future Enhancements

- Live IoT sensor integration
- Gamification for eco-friendly actions
- Rewards system for recycling behavior
- Municipal dashboard for city admins

---

## 📁 Project Structure

ecotrack-ai/
├── app/                        # Next.js App Router
│   ├── layout.js               # Root HTML layout
│   ├── page.js                 # Main app shell + page router
│   └── globals.css             # Tailwind directives + design tokens
├── components/
│   ├── Sidebar.jsx             # Fixed navigation sidebar
│   ├── Topbar.jsx              # Top bar + notification panel
│   ├── ChatBot.jsx             # Floating EcoBot AI chatbot
│   ├── EcoMap.jsx              # Premium vector city map component
│   ├── DashboardCharts.jsx     # Chart.js chart components
│   ├── pages/                  # Full page components
│   │   ├── DashboardPage.jsx
│   │   ├── ScannerPage.jsx     # AI scanner with Gemini loading states
│   │   ├── ResultPage.jsx      # Scan result + JSON panel
│   │   ├── MapPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── RewardsPage.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── AdminPage.jsx       # Smart city IoT dashboard
│   │   └── AuthPage.jsx        # Firebase Auth (email + Google)
│   └── ui/
│       ├── StatCard.jsx
│       ├── Badge.jsx
│       ├── ProgressBar.jsx
│       └── Toast.jsx
├── lib/
│   ├── appState.js             # Global state + Firestore schema docs
│   ├── geminiService.js        # Gemini Vision API service
│   ├── firebaseConfig.js       # Firebase SDK config + helpers
│   └── iotEngine.js            # IoT simulation engine
└── tailwind.config.js          # Design system tokens + animations