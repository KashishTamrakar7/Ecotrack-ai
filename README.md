# 🌿 EcoTrack AI
# 🌿 EcoTrack AI

🔗 **[Live Demo Link](https://ecotrack-ai-n6v1.vercel.app/)**

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

```text
ecotrack-ai/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.js             # Main layout wrapper
│   └── page.js               # Application entry point and page router
├── components/
│   ├── pages/                # App views (Dashboard, Scanner, Map, Leaderboard, etc.)
│   ├── ui/                   # Reusable UI elements (Cards, Badges, Toasts)
│   ├── ChatBot.jsx           # Floating AI assistant component
│   ├── DashboardCharts.jsx   # Analytics charts
│   ├── EcoMap.jsx            # City map component
│   ├── Sidebar.jsx           # Sidebar navigation
│   └── Topbar.jsx            # Top profile bar
├── lib/
│   ├── firebaseConfig.js     # Firebase client SDK initialization
│   ├── geminiService.js      # Google Gemini API integration
│   └── iotEngine.js          # IoT simulation engine logic
├── tailwind.config.js        # Custom theme settings and animations
└── package.json