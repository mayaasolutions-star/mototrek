# Mototrek — Project Architecture Map

This document details the high-level system architecture, component boundaries, URL routing topology, data flow, security model, and directory responsibilities for the Mototrek Ecommerce Platform.

---

## 🌐 Single-Domain Architecture Diagram (`mototrek.in`)

The customer website and the admin dashboard coexist under the same domain (`mototrek.in`), with the admin console strictly scoped under the `/admin` URL namespace:

```text
                               mototrek.in
                                    │
           ┌────────────────────────┴────────────────────────┐
           │                                                 │
           ▼                                                 ▼
    Customer Website                                   /admin Namespace
(Public Retail Experience)                       (Admin Management Console)
           │                                                 │
  • /                                              • /admin
  • /shop                                          • /admin/login
  • /product/[slug]                                • /admin/dashboard
  • /account                                       • /admin/orders
  • /events                                        • /admin/products
  • /about                                         • /admin/inventory
  • /contact                                       • /admin/customers
           │                                       • /admin/coupons
           │                                       • /admin/payments
           │                                       • /admin/shipping
           │                                       • /admin/reports
           │                                       • /admin/settings
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    ▼
                             Mototrek Backend
                             (Node.js API Services)
                                    │
                                    ▼
                             Relational Database
```

---

## 🔒 Admin Routing & Security Architecture

### 1. `/admin` URL Namespace & Sub-Routes
The Mototrek Admin Dashboard runs under the `/admin` path. It is **not** hosted on a separate domain (such as `admin.mototrek.in`).

| Route Path | Responsibility |
|---|---|
| `/admin` | Root admin landing page / redirect to dashboard or login |
| `/admin/login` | Secure admin authentication portal |
| `/admin/dashboard` | Executive overview (Sales, orders, stock alerts, revenue) |
| `/admin/orders` | Order management & status tracking |
| `/admin/orders/[id]` | Detailed order view, packing, shipping & return status |
| `/admin/products` | Product catalogue CRUD listing |
| `/admin/products/new` | Add new product form with variant & image manager |
| `/admin/products/[id]` | Edit existing product details & variant prices/stock |
| `/admin/inventory` | Stock adjustments, low stock alerts & inventory history |
| `/admin/customers` | Registered customer directory |
| `/admin/customers/[id]` | Customer profile, addresses & order history |
| `/admin/coupons` | Database-driven promo code rules & usage limits |
| `/admin/payments` | Payment transaction logs, gateway status & refunds |
| `/admin/shipping` | Courier assignment, AWB generation & tracking |
| `/admin/reports` | Sales, revenue, product & inventory analytics |
| `/admin/settings` | Store configuration & admin permissions |

---

### 2. Admin Security & Authorization Flow
The `/admin` path is solely a routing namespace, **not** a security control. Access to admin functionality is strictly protected on both frontend and backend:

```text
User Navigates to mototrek.in/admin
                 │
                 ▼
     Verify Authenticated Session
                 │
         ┌───────┴───────┐
         │               │
    Unauthenticated  Authenticated
         │               │
         ▼               ▼
Redirect to        Verify Admin Role & Permissions
/admin/login             │
                 ┌───────┴───────┐
                 │               │
            Unauthorized     Authorized
                 │               │
                 ▼               ▼
             Access Denied   Render Admin Dashboard
             (403 Error)
```

1. **Frontend Route Protection**: Unauthenticated requests to any `/admin/*` sub-route automatically redirect to `/admin/login`.
2. **Backend API Verification**: All API requests to `/api/v1/admin/*` endpoints must include a valid JWT / bearer token. The backend independently verifies `isAdmin` role permissions regardless of frontend route state.
3. **No Secret Exposure**: Gateway secrets, JWT secret keys, and database credentials remain strictly within server environment variables.

---

## 🧱 Architectural Boundaries

### 1. `website/` (Customer Frontend)
- Public-facing retail website (`/`, `/shop`, `/events`, `/about`, `/contact`).
- Image location: `website/public/images/`, referenced via `/images/...`.

### 2. `admin/` (Admin Dashboard UI Boundary)
- Internal administration console modules & page components for `/admin/*` routes.

### 3. `backend/` (Custom Node.js API Service)
- Server controllers, models, routes (`/api/v1/admin/...` & `/api/v1/public/...`), middleware, and services.

### 4. `database/` (Relational Persistence Layer)
- PostgreSQL / MySQL tables, migrations, and seeds supporting users, roles, products, variants, inventory, orders, payments, coupons, and activity logs.
