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

---

## ✨ Features

### 🔐 Authentication
- Firebase Email/Password authentication
- Persistent session across browser refreshes via Zustand + localStorage
- Protected routes — unauthenticated users are redirected to login
- Form validation with inline error messages
- Human-readable Firebase error handling (invalid credentials, too many attempts, etc.)

### 🏠 Dashboard
- Four real-time stat cards — Total Patients, Appointments Today, Bed Occupancy, Critical Cases
- Trend indicators showing percentage change vs. previous period
- Recent patients list sorted by last visit date — click any row to open the full profile
- Today's appointments table with time, department, doctor, and status badge

### 📊 Analytics
- **Date range filter** — Last 3 Months, Last 6 Months, This Year
- **Patient Volume & Appointments** — dual-line chart showing monthly trends
- **Monthly Revenue** — bar chart with highest revenue month highlighted
- **Visits by Department** — interactive donut chart with hover-to-highlight legend
- **Appointment Status Breakdown** — horizontal bar chart with percentage labels
- Summary strip showing total patients, appointments, and revenue for the selected period

### 👥 Patient Management
- 20 mock patients across 10 medical departments
- **Grid view** — visual cards with avatar, status badge, department, contact info
- **List view** — compact sortable table with all key fields
- **Real-time search** — filter by name, patient ID, doctor, or diagnosis
- **Status filter** — All / Active / Inactive / Critical
- **Department filter** — scrollable chip row for all 10 departments
- Combined multi-filter support with active filter summary and clear all
- Empty state UI when no results match

### 🏥 Patient Detail Page
- Full patient profile — personal info, clinical info, diagnosis
- Hero banner with avatar, status badge, and patient ID
- Assigned doctor and department
- Appointment history — last visit (completed) and next appointment (scheduled)
- **Remind me** button — triggers a browser push notification with appointment details

### 🔔 Notifications
- Service Worker registered at root scope (`/sw.js`)
- Browser push notification support with graceful permission request flow
- **Welcome notification** — fires automatically after every login
- **Appointment reminder** — fires when clicking "Remind me" on any patient
- In-app notification panel in the topbar with unread count badge
- Mark individual notifications as read, mark all read, or clear all
- Notifications persisted in Zustand store across page navigations

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

---

## 📁 Project Structure

```
src/
├── assets/images/              # Static images
├── components/ui/              # Design library — reusable primitives
│   ├── Button/
│   ├── Input/
│   ├── Badge/
│   ├── Card/
│   ├── Avatar/
│   ├── Toggle/
│   ├── Modal/
│   ├── Spinner/
│   └── PageWrapper/
├── constants/                  # Route strings, app constants, design tokens
├── data/                       # Mock JSON data
│   ├── patients.json           # 20 mock patients
│   ├── dashboard.json          # Stat cards + today's appointments
│   └── analytics.json          # Chart datasets
├── features/                   # Feature-level composed components
│   ├── auth/                   # Login carousel
│   ├── dashboard/              # StatCard
│   ├── analytics/              # 4 chart components
│   ├── patients/               # PatientCard, PatientRow, PatientGrid, PatientList
│   └── notifications/          # WelcomeNotification
├── hooks/                      # useAuth, useNotification
├── layouts/                    # AppLayout (sidebar + topbar), AuthLayout
├── lib/                        # Firebase init
├── pages/                      # Login, Dashboard, Analytics, Patients, PatientDetail, NotFound
├── router/                     # AppRouter, ProtectedRoute
├── store/                      # Zustand stores — authStore, patientStore, uiStore
├── styles/                     # global.css (Tailwind + font + reset)
├── types/                      # TypeScript interfaces
└── utils/                      # Date formatters, color helpers
public/
└── sw.js                       # Service Worker
```

---

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

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | Single column, bottom navigation bar, stacked cards |
| Tablet (640px – 1024px) | Two-column grids, hamburger drawer |
| Desktop (> 1024px) | Full sidebar, multi-column grids, expanded charts |

---

## 🔒 State Management

Three Zustand stores handle all global state:

**`authStore`** — user object, isAuthenticated, login(), logout(), initAuth() (Firebase listener), justLoggedIn flag for post-login notification trigger

**`patientStore`** — patients list from JSON, selectedPatient, viewMode (grid/list), searchQuery, statusFilter, departmentFilter — all filter logic computed via `useMemo` in the page component

**`uiStore`** — sidebarCollapsed, notifications array with read/unread state — both persisted to localStorage via Zustand persist middleware

---

## 📋 Evaluation Criteria Coverage

| Criteria | Implementation |
|---|---|
| Code quality and structure | Feature-based folder structure, TypeScript throughout, barrel exports, single responsibility components |
| UI/UX and responsiveness | Custom design library, consistent tokens, responsive at 375px / 768px / 1280px |
| State management | Zustand with persist middleware, selectors to avoid unnecessary re-renders |
| Feature completeness | All 5 required modules implemented — auth, dashboard, analytics, patients, notifications |
| Performance and best practices | Code splitting via Vite manualChunks, lazy-loadable pages, memoized filter logic |
| Scalability | Tokens in one file, feature-based folders, mock data easily swappable with real API calls |

---

## 👤 Author

Built as part of a Frontend Developer assignment for a B2B Healthcare SaaS platform.

---

## 📄 License

This project is for evaluation purposes.
