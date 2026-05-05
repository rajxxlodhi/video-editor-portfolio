# Rajkumar Lodhi Video Editing Portfolio

A complete MERN stack portfolio website for Rajkumar Lodhi, a video editor focused on reels, shorts, promotional videos, cinematic edits, thumbnails, and AI-assisted editing. It includes a Behance-inspired editorial public website, MongoDB-backed API, JWT-protected admin dashboard, contact submissions, sample data, and Cloudinary-ready media uploads.

## Tech Stack

- MongoDB + Mongoose
- Express.js + Node.js
- React + Vite
- React Router
- Axios
- Framer Motion
- Tailwind CSS
- JWT authentication
- Cloudinary signed uploads

## Project Structure

```txt
client/
  src/
    admin/
    api/
    components/
    context/
    pages/
    styles/
    App.jsx
    main.jsx

server/
  config/
  controllers/
  data/
  middleware/
  models/
  routes/
  utils/
  seed.js
  server.js
```

## Features

- Full-screen muted autoplay hero video
- Responsive black/white editorial portfolio theme inspired by modern Behance case studies
- Portfolio filters and video preview modal
- Project detail pages with case study sections
- Before/after video comparison
- Services with delivery time, revisions, pricing, and booking CTA
- Testimonials with video testimonial support
- Contact form saved to MongoDB
- Admin login/logout
- Protected admin routes
- Add, edit, and delete portfolio projects
- Add, edit, and delete services
- Add, edit, and delete testimonials
- View contact submissions
- Cloudinary signed upload helper for images and videos
- Lazy image/video loading and skeleton states
- SEO-friendly document titles and meta descriptions

## Environment Setup

Copy the examples:

```bash
cp .env.example server/.env
cp client/.env.example client/.env
```

Update `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cinematic_portfolio
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_NAME=Rajkumar Lodhi
ADMIN_EMAIL=rajxxlodhi21@gmail.com
ADMIN_PASSWORD=change-this-password
```

Update `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=917067698821
VITE_CONTACT_EMAIL=rajxxlodhi21@gmail.com
VITE_INSTAGRAM_URL=https://instagram.com/
VITE_YOUTUBE_URL=https://youtube.com/
VITE_LINKEDIN_URL=https://linkedin.com/
VITE_BEHANCE_URL=https://behance.net/
```

## Install

```bash
npm run install:all
```

On Windows PowerShell, if you see an execution policy error for `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd run install:all
```

Or install each app separately:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

PowerShell-safe separate install commands:

```powershell
npm.cmd install
npm.cmd install --prefix server
npm.cmd install --prefix client
```

## Seed Dummy Data

Start MongoDB locally, then run:

```bash
npm run seed
```

PowerShell-safe command:

```powershell
npm.cmd run seed
```

This creates:

- 1 admin user
- 6 portfolio projects
- 6 services
- 4 testimonials

Default admin credentials come from `server/.env`.

## Run Development Servers

```bash
npm run dev
```

PowerShell-safe command:

```powershell
npm.cmd run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

Admin:

```txt
http://localhost:5173/admin/login
```

## API Routes

### Auth

- `POST /api/auth/login`
- `GET /api/auth/me`

### Projects

- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Services

- `GET /api/services`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Testimonials

- `GET /api/testimonials`
- `POST /api/testimonials`
- `PUT /api/testimonials/:id`
- `DELETE /api/testimonials/:id`

### Contact

- `POST /api/contact`
- `GET /api/contact`

### Upload

- `POST /api/upload/signature`

The upload route is protected and returns a signed Cloudinary upload payload. The admin dashboard uses it to upload thumbnails, project videos, before/after videos, testimonial images, and testimonial videos.

## Production Notes

- Use a hosted MongoDB provider such as MongoDB Atlas.
- Use a strong `JWT_SECRET`.
- Restrict `CLIENT_URL` to the deployed frontend domain.
- Configure Cloudinary credentials before using admin uploads.
- Put the backend behind HTTPS in production.
- For large videos, keep grid cards thumbnail-only and upload compressed preview files for fast loading.

## Build

```bash
npm run build
npm start
```

The server exposes the API. The React build can be deployed separately to Vercel, Netlify, Cloudflare Pages, or any static host.

## Netlify Deployment

This project includes `netlify.toml`, so Netlify can deploy the React frontend from the `client` folder.

For Git-based deploys, use:

```txt
Base directory: client
Build command: npm run build
Publish directory: dist
```

For manual drag-and-drop deploys:

```powershell
cd client
npm.cmd run build
```

Then upload the generated `client/dist` folder to Netlify, not the project root and not the `client` source folder.

The `client/public/_redirects` file fixes React Router refresh/direct-link 404s by sending all frontend routes to `index.html`.
