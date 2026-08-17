# Mototrek — Ecommerce Platform Architecture

Welcome to the Mototrek ecommerce codebase. This platform is structured into modular application boundaries to ensure high scalability, clean separation of concerns, and maintainability as the platform grows.

---

## 🌐 Unified Domain Routing Topology (`mototrek.in`)

Both the customer-facing store and the internal admin dashboard operate under the single primary domain (`mototrek.in`):

- **Customer Website**: `https://mototrek.in/` (Shop: `/shop`, Products: `/product/[slug]`, Account: `/account`, Events: `/events`, About: `/about`, Contact: `/contact`)
- **Admin Dashboard**: `https://mototrek.in/admin` (Login: `/admin/login`, Orders: `/admin/orders`, Products: `/admin/products`, Inventory: `/admin/inventory`, Customers: `/admin/customers`, Coupons: `/admin/coupons`, Payments: `/admin/payments`, Shipping: `/admin/shipping`, Reports: `/admin/reports`, Settings: `/admin/settings`)

---

## 📁 Architectural Boundaries

```text
mototrek.in/
│
├── website/            # Customer-facing React + Next.js website
│   ├── public/images/  # All website image assets
│   ├── app/            # Next.js App Router (customer routes & /admin boundary)
│   ├── components/     # UI components (Header, Footer, ProductCard, etc.)
│   ├── context/        # React context (EnquiryContext, etc.)
│   └── data/           # Static data modules
│
├── admin/              # Internal Admin & Inventory Management Dashboard Modules
│   ├── public/         # Admin static assets
│   └── src/            # Dashboard UI components, pages & layouts (/admin namespace)
│
├── backend/            # Custom Node.js REST API Backend Server
│   ├── src/            # Controllers, models, routes, services, middleware
│   ├── uploads/        # Product upload storage
│   └── tests/          # Backend integration tests
│
├── database/           # Relational Database Schema & Migrations
│   ├── migrations/     # Versioned SQL migrations
│   ├── schema/         # DDL schemas & entity definitions
│   ├── seeds/          # Initial seed data scripts
│   └── backups/        # Database backup storage (ignored by Git)
│
├── scripts/            # Platform Utilities & Maintenance Automation
│   ├── import-products/
│   ├── inventory/
│   └── maintenance/
│
├── docs/               # System & API Architectural Documentation
│   ├── architecture/   # project-architecture.md (Single domain topology & security)
│   ├── api/            # REST API specs & endpoint contracts
│   ├── database/       # Entity relationship diagrams & schema specs
│   └── deployment/     # Server setup & CI/CD deployment guides
│
├── .env.example        # Environment variable templates (No secrets)
├── .gitignore          # Version control ignore rules
├── package.json        # Root workspace orchestrator
└── README.md           # This documentation
```

---

## ⚡ Quick Start (Customer Website)

To run the customer website locally:

```bash
# Navigate to website boundary
cd website

# Install dependencies
npm install

# Start production server or dev server
npm run dev     # Development mode
npm run build   # Build production bundle
npm run start   # Run production server
```

The customer website will be available at **`http://localhost:3000`**.

---

## 🔒 Security & Environment Setup

- Copy `.env.example` to `.env` in the required boundary.
- **Never commit `.env` or real API keys, passwords, or payment gateway secrets to version control.**
