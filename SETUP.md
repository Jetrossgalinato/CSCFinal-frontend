# 🚀 Quick Setup Guide - Drone Surveillance Frontend

## ⚡ Quick Start (3 Steps)

### 1. Install Dependencies

```bash
npm install
```

### 2. Verify Environment Configuration

The `.env.local` file is already configured:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STATS_REFRESH_INTERVAL=500
```

### 3. Start Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Pre-flight Checklist

Before starting the frontend, ensure:

- [ ] **Node.js 18+** is installed (`node --version`)
- [ ] **FastAPI backend** is running on `http://localhost:8000`
- [ ] Backend endpoints are accessible:
  - `http://localhost:8000/` (API info)
  - `http://localhost:8000/video_feed` (video stream)
  - `http://localhost:8000/stats` (detection stats)

---

## 🎯 What to Expect

### On Success

You should see:

- ✅ Live video feed with bounding boxes (green = civilian, red = soldier)
- ✅ Real-time statistics updating every 500ms
- ✅ Green "Live" indicator in header
- ✅ Responsive layout on all screen sizes

### If Backend is Offline

- ⚠️ Red "Offline" status indicator
- ⚠️ Error banner at top of page
- ⚠️ Video feed shows retry option
- ⚠️ Statistics show loading state

---

## 🎨 Features You Can Test

1. **Dark Mode**: Click moon/sun icon in header
2. **Video Controls**: Refresh and fullscreen buttons
3. **Responsive Design**: Resize browser window
4. **Auto-reconnection**: Stop/start backend to test reconnection

---

## 🐛 Common Issues

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Backend Not Connecting

1. Verify backend is running: `curl http://localhost:8000`
2. Check CORS settings in FastAPI backend
3. Look at browser console for error details

### Dark Mode Not Working

1. Clear browser localStorage
2. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

---

## 📦 Project Structure

```
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── public/              # Static assets
├── .env.local          # Environment variables
└── package.json        # Dependencies
```

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📱 Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🎓 Next Steps

1. Make sure the backend is running
2. Start the frontend: `npm run dev`
3. Open `http://localhost:3000`
4. Toggle dark mode to test theming
5. Try fullscreen video mode
6. Resize window to test responsive design

---

## 💡 Tips

- **Performance**: Stats refresh every 500ms by default (configurable in `.env.local`)
- **Video Quality**: Depends on backend stream settings
- **Mobile**: Works best in landscape mode
- **Development**: Hot reload is enabled - changes appear instantly

---

## 📚 Documentation

For detailed documentation, see the main [README.md](./README.md)

---

**Ready to go? Run `npm run dev` and visit http://localhost:3000** 🚀
