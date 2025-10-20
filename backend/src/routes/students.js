import express from 'express';
import { authRequired } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { TrackingEvent } from '../models/TrackingEvent.js';

const router = express.Router();

router.get('/me', authRequired, async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'role', 'createdAt'] });
  return res.json(user);
});

router.put('/me', authRequired, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const { name } = req.body;
  if (name) user.name = name;
  await user.save();
  return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

router.get('/dashboard', authRequired, async (req, res) => {
  const totalEvents = await TrackingEvent.count({ where: { userId: req.user.id } });
  return res.json({ message: `Welcome ${req.user.name}!`, totalEvents });
});

export default router;
