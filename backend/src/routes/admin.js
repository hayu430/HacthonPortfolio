import express from 'express';
import { adminOnly, authRequired } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { TrackingEvent } from '../models/TrackingEvent.js';
import { Sequelize } from 'sequelize';

const router = express.Router();

router.get('/students', authRequired, adminOnly, async (_req, res) => {
  const students = await User.findAll({ where: { role: 'student' }, attributes: ['id', 'name', 'email', 'createdAt'] });
  return res.json({ students });
});

router.get('/reports/summary', authRequired, adminOnly, async (_req, res) => {
  const totalStudents = await User.count({ where: { role: 'student' } });
  const totalEvents = await TrackingEvent.count();
  const eventsByPageRaw = await TrackingEvent.findAll({
    attributes: ['page', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
    group: ['page'],
  });
  const eventsByPage = Object.fromEntries(eventsByPageRaw.map((r) => [r.page, Number(r.get('count'))]));
  return res.json({ totalStudents, totalEvents, eventsByPage });
});

export default router;
