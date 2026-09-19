# OBERP — Online Business ERP

Landing site for **OBERP** (Online Business ERP): website making, Android and iOS apps, desktop software, and custom ERP solutions.

## Local run

1. Copy `.env.example` to `.env` and add the GoDaddy SMTP password.
2. Install and start:

```
npm install
npm start
```

3. Open `http://localhost:3000`.

The contact form posts to `POST /api/contact` and sends mail the same way as Fitness Freaks: GoDaddy Workspace SMTP with fallbacks (465, 587, 80, 3535, 25, then `relay-hosting.secureserver.net`). Do not commit `.env`.

## Deploy

Host on a Node.js server (VPS, Railway, Render, or similar). Shared PHP-only hosting will not run the contact API.

After go-live, submit `https://online-business-erp.com/sitemap.xml` in Google Search Console.
