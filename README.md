<div align="center">

# 🌱 GreenDeal
### AI-Ready Smart Agri Marketplace

**Connecting farmers directly to consumers — no middlemen, just fair deals.**

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_Router-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-brightgreen?style=for-the-badge)]()

</div>

---

## 🚀 Overview

**GreenDeal** is a cross-platform mobile marketplace built to close the gap between farmers and consumers. By cutting out traditional supply chain intermediaries, it enables **direct, transparent, real-time trading** — giving farmers better margins and consumers fresher produce at fairer prices.

Built with a modern React Native + Firebase stack, GreenDeal is architected to scale from a campus prototype into a production-ready agri-tech platform.

> 💡 **The Problem:** Farmers lose a significant share of their profit to middlemen. Consumers pay inflated prices for produce that's often days old.
> 
> ✅ **The Solution:** A live, chat-and-bid-driven marketplace that puts farmers and buyers in direct contact.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔄 **Direct Farmer-to-Consumer Trading** | Eliminates intermediary steps entirely, connecting supply directly with demand |
| 💬 **Real-Time Chat & Bidding** | Live negotiation powered by Firebase Firestore — messages and bids sync instantly across devices |
| 🔐 **Secure Authentication** | Firebase Auth with persistent session management and real-time form validation |
| 📱 **Cross-Platform** | Single codebase deployed seamlessly to both Android and iOS via Expo |
| ⚡ **Scalable State Management** | Centralized React Context API architecture spanning 10+ screens — zero prop-drilling |

---

## 🏗️ Tech Stack

```
Frontend    →  React Native · Expo Router
Backend     →  Firebase (Firestore, Authentication)
State Mgmt  →  React Context API
Realtime    →  Firestore Listeners / Live Sync
```

---

## 🧠 Architecture Highlights

- **Real-Time Data Layer** — Firestore listeners power live message sync and bid updates without polling, keeping every screen instantly consistent.
- **Centralized State** — A custom Context API layer manages global app state across 10+ screens, replacing brittle prop-drilling with clean, predictable data flow.
- **Secure Session Handling** — Firebase Authentication manages persistent sessions with client-side validation for a smooth, secure onboarding experience.
- **File-Based Routing** — Expo Router keeps navigation declarative and scalable as new screens are added.

---

## 📲 Getting Started

```bash
# Clone the repository
git clone https://github.com/Gopika-R2410/greendeal.git
cd greendeal

# Install dependencies
npm install

# Add your Firebase config
# Create a firebaseConfig.js file with your project credentials

# Run the app
npx expo start
```

---

## 🔮 Roadmap

- [ ] AI-powered price recommendation engine
- [ ] Crop demand forecasting using historical bid data
- [ ] In-app payments & escrow system
- [ ] Multi-language support for regional farmers
- [ ] Push notifications for live bid alerts

---

## 📈 Impact

Designed and validated with **100+ potential end users** during early testing, GreenDeal demonstrates a working model for reducing supply chain friction in agricultural trade — a foundation ready to scale toward real AI-driven market intelligence.

---

<div align="center">

### 🌾 Built to put farmers first.

*Made with React Native, Firebase, and a lot of ☕*

</div>
