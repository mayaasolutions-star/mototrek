# Mototrek Backend REST API Service

The backend is an independent, custom Node.js + Express + PostgreSQL REST API application. It serves as the single source of truth for business logic, catalog management, inventory, cart validation, order processing, payments, coupons, shipping, and admin management.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (`pg` pool abstraction)
- **Security**: Helmet, CORS, Express Rate Limit
- **API Base Path**: `/api/v1/`

---

## 📁 Directory Structure
```text
backend/
├── src/
│   ├── config/          # Environment, Postgres DB pool & CORS configuration
│   ├── controllers/     # HTTP request handlers (Health, Auth, Product, Order)
│   ├── middleware/      # Global error handler, security, auth & logging middleware
│   ├── models/          # Database query & model abstractions
│   ├── routes/          # Versioned REST API routers (/api/v1/...)
│   ├── services/        # Business logic boundaries (Payment, Shipping, Notifications)
│   ├── validators/      # Payload validation rules
│   ├── utils/           # Standardized ApiResponse & logger utilities
│   ├── app.js           # Express app setup & middleware pipeline
│   └── server.js        # Server entry point & HTTP listener
├── tests/               # Health check and unit test suites
├── uploads/             # Media upload storage directory
│   └── products/
├── .env.example         # Environment template (No real credentials)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies & scripts
└── README.md            # This documentation
```

---

## ⚡ Quick Start

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run development server with auto-reload
npm run dev

# Run unit tests
npm test
```

Default server port: `http://localhost:5000`  
Health check endpoint: **`GET http://localhost:5000/api/v1/health`**
