# 🛸 Drone Surveillance System - Frontend

A modern, responsive Next.js web application for real-time drone surveillance with YOLOv8 detection visualization.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Icons**: Lucide React
- **State Management**: React Hooks
- **API Integration**: Fetch API

## ✨ Features

### Core Features

✅ **Real-time Video Streaming** - Live MJPEG feed from drone camera  
✅ **Auto-updating Statistics** - Detection counts refresh every 500ms  
✅ **Responsive Design** - Mobile-first, works on all screen sizes  
✅ **Error Handling** - Graceful fallbacks and retry mechanisms  
✅ **Loading States** - Smooth loading experiences

### Enhanced Features

✅ **Dark Mode** - Toggle between light and dark themes  
✅ **Animated Counters** - Smooth transitions for statistics  
✅ **Full-screen Video** - Maximize video feed for better visibility  
✅ **Connection Status** - Live indicator showing backend connectivity  
✅ **Auto-reconnection** - Automatic retry on connection loss  
✅ **Performance Optimized** - Memoization and efficient re-renders

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- FastAPI backend running on `http://localhost:8000`

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env.local` file is already configured with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STATS_REFRESH_INTERVAL=500
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── Header.tsx           # App header with status and theme toggle
│   ├── VideoFeed.tsx        # MJPEG stream display component
│   ├── StatsCard.tsx        # Individual statistic card
│   ├── StatsDashboard.tsx   # Statistics panel container
│   ├── DetectionLegend.tsx  # Color legend for detections
│   └── ThemeToggle.tsx      # Dark mode toggle button
├── hooks/
│   ├── useStats.ts          # Custom hook for stats fetching
│   └── useTheme.ts          # Dark mode state management
├── lib/
│   └── api.ts               # API utility functions
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🎨 UI Components

### Header

- Application title with drone emoji
- Live connection status indicator (pulsing green/red dot)
- Current time display
- Dark mode toggle button

### Video Feed

- Real-time MJPEG stream display
- Loading spinner during initialization
- Error handling with retry button
- Full-screen mode toggle
- Refresh button

### Statistics Dashboard

- **Soldiers Count** - Red theme, shield icon
- **Civilians Count** - Green theme, users icon
- **Total Detected** - Blue theme, target icon
- Animated counter transitions
- Auto-refresh every 500ms

### Detection Legend

- Visual guide for bounding box colors
- 🟢 Green box = Civilian (Class 0)
- 🔴 Red box = Soldier (Class 1)

## 🔌 API Integration

The frontend connects to these FastAPI endpoints:

### Video Feed

```
GET http://localhost:8000/video_feed
```

Returns MJPEG stream with annotated bounding boxes.

### Statistics

```
GET http://localhost:8000/stats
```

Returns real-time detection counts:

```json
{
  "soldier": 2,
  "civilian": 5,
  "total": 7
}
```

## 🎨 Theming

The application supports light and dark modes with smooth transitions.

### Theme Toggle

- Click the moon/sun icon in the header
- Preference is saved to localStorage
- Defaults to system preference

### Color Palette

**Light Mode:**

- Background: `#ffffff`
- Foreground: `#0a0a0a`
- Cards: `#f3f4f6`

**Dark Mode:**

- Background: `#0a0a0a`
- Foreground: `#ededed`
- Cards: `#1f2937`

## 📱 Responsive Design

- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640px - 1024px (stacked layout)
- **Desktop**: > 1024px (70/30 split layout)

## ⚡ Performance Optimizations

1. **React Memoization** - Components wrapped with `React.memo` where appropriate
2. **Efficient Polling** - Configurable refresh interval for statistics
3. **Lazy Loading** - Components load on demand
4. **Optimized Re-renders** - State updates minimized
5. **CSS Transitions** - Hardware-accelerated animations

## 🚨 Error Handling

### Video Stream Errors

- Display error message with retry button
- Check backend connectivity
- Show user-friendly error states

### API Errors

- Graceful degradation when backend is offline
- Connection status indicator in header
- Automatic reconnection attempts

## 🔧 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Environment Variables

| Variable                             | Default                 | Description                 |
| ------------------------------------ | ----------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`                | `http://localhost:8000` | FastAPI backend URL         |
| `NEXT_PUBLIC_STATS_REFRESH_INTERVAL` | `500`                   | Stats refresh interval (ms) |

## 🐛 Troubleshooting

### Video Feed Not Loading

1. Verify backend is running: `http://localhost:8000`
2. Check CORS settings in FastAPI backend
3. Click the refresh button in video feed header
4. Check browser console for errors

### Statistics Not Updating

1. Verify backend `/stats` endpoint is accessible
2. Check network tab in browser DevTools
3. Verify refresh interval in `.env.local`

### Dark Mode Not Persisting

1. Check localStorage in browser DevTools
2. Ensure JavaScript is enabled
3. Clear browser cache and reload

## 🧪 Testing Checklist

- [x] Video stream loads correctly
- [x] Statistics update in real-time
- [x] Dark mode toggles properly
- [x] Responsive on mobile/tablet/desktop
- [x] Error states display correctly
- [x] Reconnection works after backend restart
- [x] TypeScript types properly defined
- [x] No console errors or warnings

## 📝 Quick Start Guide

1. **Ensure Backend is Running**

   ```bash
   # Backend should be accessible at http://localhost:8000
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Access Application**
   - Open browser to `http://localhost:3000`
   - You should see the live video feed and statistics

## 🎯 Key Features Overview

| Feature         | Description                      | Status   |
| --------------- | -------------------------------- | -------- |
| Live Video      | MJPEG stream with bounding boxes | ✅ Ready |
| Real-time Stats | Auto-updating detection counts   | ✅ Ready |
| Dark Mode       | Light/Dark theme toggle          | ✅ Ready |
| Responsive      | Mobile, Tablet, Desktop support  | ✅ Ready |
| Error Handling  | Graceful fallbacks               | ✅ Ready |
| Fullscreen      | Maximize video feed              | ✅ Ready |

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ using Next.js and TypeScript**
