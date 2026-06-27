# NurStudy Education Consulting Website

Verified public repository for Abdulaziz's Kwork portfolio.

## Status

- Repository: public
- Live URL: https://rainbow-pasca-8380e7.netlify.app/
- Portfolio category: Education Website, Corporate Website, Business Website, Lead Generation
- Security cleanup: hardcoded admin password and Supabase values removed on 2026-06-27

## Overview

NurStudy is a responsive study-abroad consulting website built to present country programs, universities, consultation flows, and lead-management pages for an education consulting business.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Supabase client
- Netlify deployment

## Main Features

- Study-abroad landing pages
- Country and university pages
- Consultation modal and lead capture flow
- Multilingual content structure
- Admin pages for applications, countries, testimonials, universities, and users
- Responsive layout for desktop and mobile

## Local Setup

```bash
npm install
npm run dev
```

Create a local `.env` file when Supabase or admin access is needed:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_ADMIN_PASSWORD=your-admin-password
```

## Build

```bash
npm run build
npm run preview
```

## Security Notes

- Do not commit `.env` files.
- Admin password must be configured in the deployment environment.
- Supabase access must depend on proper Row Level Security policies.
- Public Supabase publishable keys are intentionally not stored in the repository.

## Portfolio Use

Use this project as proof for:

- Education consulting websites
- Corporate/business websites
- Lead capture forms
- Responsive React/Tailwind interfaces
- Supabase-powered admin/content workflows
