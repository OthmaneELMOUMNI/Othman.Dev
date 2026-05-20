# Othman.Dev

A modern personal portfolio website built with React, Vite, and Tailwind CSS. The app includes:

- responsive hero, about, skills, projects, services, process, and contact sections
- dark/light theme toggle
- English/French language toggle
- animated navigation and UI interactions using `motion`
- accessible mobile menu and smooth scrolling layout

## Technologies

- React 19
- Vite
- Tailwind CSS
- TypeScript
- Express
- dotenv
- lucide-react
- motion

## Getting Started

### Prerequisites

- Node.js (recommended latest LTS)

### Install

```bash
npm install
```

### Environment

If you want to override local settings, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

The contact form sends messages to `othmanemoumni5@gmail.com`. To enable delivery, configure SMTP settings in `.env`:

```env
DISABLE_HMR=true
PORT=3001
CONTACT_TO_EMAIL=othmanemoumni5@gmail.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USERNAME=your-gmail-address@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM_ADDRESS=your-gmail-address@gmail.com
```

For Gmail, create an app password in your Google account and use it as `MAIL_PASSWORD`. Do not use your normal Gmail password.

### Run Locally

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/` — source code and React components
- `src/App.tsx` — main app layout and section composition
- `src/AppContext.tsx` — theme and language state provider
- `src/components/` — UI sections and navigation
- `src/index.css` — global styling

## Notes

The app is designed as a frontend portfolio site. If you need any additional backend or API integration, add the required configuration and packages as needed.
