/**
 * Learn Java - Backend API
 * Serves curriculum (weeks, topics, projects) and user progress.
 * Expandable: add new weeks via seed scripts or admin API.
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import curriculumRoutes from './routes/curriculum.js';
import progressRoutes from './routes/progress.js';
import authRoutes from './routes/auth.js';
import { optionalAuth } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;
// Use MONGODB_URI for local or Atlas, e.g. mongodb+srv://user:pass@cluster0.xxx.mongodb.net/learn-java?appName=Cluster0
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learn-java';

// Middleware: allow frontend origin and JSON body
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Log all requests for learning/debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Require MongoDB for curriculum and progress APIs; return 503 if DB not connected
function requireDb(req, res, next) {
  if (mongoose.connection.readyState === 1) return next();
  res.status(503).json({
    error: 'Service Unavailable',
    message: 'Database not connected. Start the MongoDB server (mongod). On Windows run: net start MongoDB. Then run npm run seed in the backend folder. The backend will auto-reconnect when MongoDB is up.',
  });
}

// API routes - curriculum is expandable (new weeks = new documents)
app.use('/api/curriculum', requireDb, curriculumRoutes);
app.use('/api/auth', requireDb, authRoutes);
app.use('/api/progress', requireDb, optionalAuth, progressRoutes);

// Also mount at root (no /api prefix) so old/cached frontends that call /progress, /auth/register, etc. still work
app.use('/curriculum', requireDb, curriculumRoutes);
app.use('/auth', requireDb, authRoutes);
app.use('/progress', requireDb, optionalAuth, progressRoutes);

// Health check for deployment and debugging (includes MongoDB status)
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbOk = dbState === 1; // 1 = connected
  const status = dbOk ? 'ok' : 'degraded';
  res.status(dbOk ? 200 : 503).json({
    status,
    message: 'Learn Java API is running',
    mongodb: dbOk ? 'connected' : { readyState: dbState, hint: 'Start MongoDB and ensure backend ran npm run seed' },
  });
});
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbOk = dbState === 1;
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? 'ok' : 'degraded',
    message: 'Learn Java API is running',
    mongodb: dbOk ? 'connected' : { readyState: dbState },
  });
});

// Try to connect to MongoDB (with timeout so we don't hang)
async function connectDb() {
  return mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
}

// Connect to MongoDB and start server (server starts even if DB fails so API can return 503)
async function start() {
  try {
    await connectDb();
    console.log('MongoDB connected:', MONGODB_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('Server will start anyway. API routes will return 503 until MongoDB is available.');
    console.warn('Make sure the MongoDB *server* (mongod) is running — e.g. Windows: "net start MongoDB", or run mongod.');
    // Reconnect every 5s so when user starts MongoDB we connect without restarting the backend
    const reconnectInterval = setInterval(async () => {
      if (mongoose.connection.readyState === 1) {
        clearInterval(reconnectInterval);
        return;
      }
      try {
        await connectDb();
        console.log('MongoDB connected (reconnected):', MONGODB_URI);
        clearInterval(reconnectInterval);
      } catch (e) {
        // still not available, will retry
      }
    }, 5000);
  }
  app.listen(PORT, () => {
    console.log(`Learn Java API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
