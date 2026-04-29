# HealthCore — B2B Healthcare SaaS Dashboard

![HealthCore](https://img.shields.io/badge/HealthCore-v1.0.0-2563EB?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

A modern, fully responsive B2B Healthcare SaaS platform built for clinic administrators and hospital operations teams. HealthCore provides a unified interface for managing patients, tracking analytics, and monitoring daily operations — designed with real-world healthcare workflows in mind.

---

## 🔐 Demo Credentials

> Use these credentials to log in and explore the application without creating an account.

| Field    | Value               |
|----------|---------------------|
| Email    | testing@gmail.com   |
| Password | testing             |

---

## 🚀 Live Demo

🔗 [View Live Application](https://healthcare-dashboard-omega-ochre.vercel.app/) <!-- Replace with your Vercel/Netlify URL -->

📁 [GitHub Repository](https://github.com/NikhilDongre1/healthcare-dashboard) <!-- Replace with your GitHub URL -->

---

## 📸 Application Overview

### Pages at a Glance

| Page | Description |
|---|---|
| Login | Split-layout with auto-advancing image carousel |
| Dashboard | Command center with stat cards, recent patients, today's appointments |
| Analytics | Interactive charts with date range filtering |
| Patients | Grid/list view with real-time search and multi-filter |
| Patient Detail | Full patient profile with appointment history and reminders |

## 📋 Features

### Login
- Email and password login  
- Keeps users signed in after refresh  
- Shows clear error messages for invalid login  

### Dashboard
- Shows key numbers like total patients and today’s appointments  
- List of recent patients  
- Table of today’s appointments with status  

### Analytics
- Charts for patient and appointment trends  
- Revenue overview  
- Department-wise visit breakdown  
- Filter data by time range  

### Patients
- View patients in grid or list format  
- Search by name, ID, doctor, or diagnosis  
- Filter by status and department  
- Works with multiple filters at once  

### Patient Details
- Full profile with basic and medical info  
- Shows past and upcoming appointments  
- Assigned doctor and department  
- Button to set an appointment reminder  

### Notifications
- Notification after login  
- Reminder notifications for appointments  
- Panel to view and manage notifications  
- Mark as read or clear all  

### Responsive Design
- Works on mobile, tablet, and desktop  
- Layout adjusts based on screen size  

### 🎨 Custom Design Library
All components are built from scratch with full variant support:

| Component | Variants |
|---|---|
| `Button` | primary / secondary / danger / ghost · filled / outlined · sm / md / lg · loading state |
| `Input` | default / focus / error / disabled · with label, left icon, right icon, hint, error message |
| `Badge` | success / warning / error / info / neutral · with optional dot indicator · sm / md |
| `Card` | configurable padding · hover lift effect · click handler support |
| `Avatar` | image with fallback to initials · deterministic color from name · sm / md / lg / xl |
| `Toggle` | controlled on/off · sm / md size · with optional label |
| `Modal` | sm / md / lg · header / body / footer slots · closes on Escape or backdrop click |
| `Spinner` | sm / md / lg · used for all loading states |
| `PageWrapper` | fade-in transition on mount · loading skeleton state |

---

## 🛠 Tech Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| State management | Zustand (with persist middleware) |
| Authentication | Firebase Authentication |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Notifications | Service Worker + Notification API |
| Package manager | npm |


## 🎨 Design Tokens

All colors are defined in `tailwind.config.js` as a single `colorTokens` object. To retheme the entire application, change values in one place:

```js
const colorTokens = {
  primary:       '#2563EB',   // Main brand blue
  primaryDark:   '#1D4ED8',   // Hover state
  primaryLight:  '#DBEAFE',   // Backgrounds, highlights
  accent:        '#0EA5E9',   // Secondary blue
  bg:            '#F8FAFC',   // Page background
  surface:       '#FFFFFF',   // Cards, panels
  border:        '#E2E8F0',   // All borders
  textPrimary:   '#0F172A',   // Headings, body
  textSecondary: '#64748B',   // Labels, meta
  textMuted:     '#94A3B8',   // Placeholders, hints
  success:       '#10B981',   // Active, completed
  warning:       '#F59E0B',   // Scheduled, pending
  error:         '#EF4444',   // Critical, cancelled
  sidebar:       '#1E3A5F',   // Sidebar background
  sidebarText:   '#CBD5E1',   // Sidebar nav text
}
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- A Firebase project with Email/Password authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/healthcare-dashboard.git
cd healthcare-dashboard

# Install dependencies
npm install
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Email/Password** under Authentication → Sign-in methods
4. Register a web app and copy the config

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Vercel auto-detects Vite — no configuration needed
4. Add all `VITE_FIREBASE_*` environment variables in Project Settings → Environment Variables
5. Deploy

### Netlify

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Site Settings → Environment Variables

## 📄 License

This project is for evaluation purposes.
