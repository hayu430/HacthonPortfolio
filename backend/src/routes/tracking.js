import express from 'express';
import { authRequired } from '../middleware/auth.js';
import { TrackingEvent } from '../models/TrackingEvent.js';

const router = express.Router();

router.post('/', authRequired, async (req, res) => {
  const { eventName, page, metadata } = req.body;
  if (!eventName || !page) return res.status(400).json({ message: 'Missing eventName or page' });
  const event = await TrackingEvent.create({ eventName, page, metadata: metadata || null, userId: req.user.id });
  return res.status(201).json({ id: event.id });
});

export default router;
