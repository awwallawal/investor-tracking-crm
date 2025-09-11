// app.ts (formerly index.ts)

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db'; // Your database connection logic
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Connect to the database only in a non-test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

// ... (CORS configuration and other middleware)

app.use(express.json());
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5173', 'https://investor-tracking-crm-frontend.vercel.app'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

// Define Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'ok' : 'error';
  res.status(200).json({ 
    status: 'ok',
    database: dbStatus
  });
});

export default app;