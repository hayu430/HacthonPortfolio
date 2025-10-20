import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectAndSync } from './db.js';
import { User } from './models/User.js';

dotenv.config();

async function run() {
  await connectAndSync();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = 'Administrator';
  let admin = await User.findOne({ where: { email } });
  if (!admin) {
    const passwordHash = await bcrypt.hash(password, 10);
    admin = await User.create({ name, email, passwordHash, role: 'admin' });
    console.log('Admin user created:', email);
  } else {
    console.log('Admin already exists:', email);
  }
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
