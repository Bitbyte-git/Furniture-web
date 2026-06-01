# NESTORA — Furniture Company Website (MERN Stack)

A full-stack furniture e-commerce platform built per the Configuration Workbook (CWB) v1.0, with a Japandi-inspired UI matching the NESTORA design mockup — including **parallax hero and promo sections**, dynamic product catalogue, cart, checkout, orders, and admin panel.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt (12 rounds) |

## Features (CWB Modules)

- **Authentication** — Register/login, JWT, roles (Customer, Admin, Delivery)
- **Product Catalogue** — Categories, search, filters, featured/best sellers from MongoDB
- **Cart & Wishlist** — Guest cart (session), logged-in cart, merge on login
- **Orders** — Checkout, GST calculation, invoices, shipments, order tracking
- **Admin Panel** — Dashboard stats, order status updates, low-stock alerts
- **Newsletter** — Email subscription
- **Parallax UI** — Hero slider & New Collection banner (Framer Motion scroll transforms)

## Prerequisites

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **MongoDB** running locally or MongoDB Atlas connection string

## Quick Start

```bash
# 1. Install dependencies
npm run install:all

# 2. Configure server (edit server/.env if needed)
# MONGODB_URI=mongodb://127.0.0.1:27017/nestora

# 3. Seed database (products, banners, demo users)
npm run seed

# 4. Run dev (API :5000 + UI :5173)
npm run dev
```

Open **http://localhost:5173**

### Run automated API tests (server must be running)

```bash
npm test
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nestora.com | Admin@123 |
| Customer | customer@nestora.com | Customer@123 |

## Project Structure

```
furniture-web/
├── client/          # React frontend
│   └── src/
│       ├── components/   # Header, Footer, Parallax, Hero, etc.
│       ├── pages/        # Home, Shop, Cart, Admin, ...
│       └── context/      # Auth, Cart
├── server/          # Express API
│   └── src/
│       ├── models/       # User, Product, Order, Cart, ...
│       └── routes/       # REST endpoints
└── README.md
```

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/auth/register` | `/login` | `GET /me`
- `GET /api/products` | `/featured` | `/categories` | `/:id`
- `GET/POST /api/cart` — Cart operations
- `POST /api/orders/checkout` | `GET /my-orders` | `GET /track/:orderId`
- `GET /api/admin/dashboard` | `/inventory` (Admin only)
- `POST /api/newsletter/subscribe`

## Submission Notes

1. Start MongoDB before seeding.
2. Run `npm run seed` once to load best sellers (Luna Chair, Hazel Sofa, etc.).
3. For production: set `MONGODB_URI`, `JWT_SECRET`, deploy client to Vercel and server to Render/Railway.

## CWB Alignment

Implements Phase 1 modules: Authentication, Product Catalogue, Customer, Cart & Checkout, Admin Panel; Phase 2 foundations: Orders, Payments (GST), Delivery (shipments), Wishlist.

---

**NESTORA** — *Design that Inspires. Comfort that Lasts.*
