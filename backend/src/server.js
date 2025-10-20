import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectAndSync } from './db.js';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import adminRoutes from './routes/admin.js';
import trackingRoutes from './routes/tracking.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'ruby-school-backend' }));

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/track', trackingRoutes);

const port = process.env.PORT || 4000;

connectAndSync()
  .then(() => {
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect/sync DB', err);
    process.exit(1);
  });
