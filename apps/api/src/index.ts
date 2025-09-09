import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5173'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

export { app, server };
