import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'sqlite:./data.sqlite';

export const sequelize = new Sequelize(databaseUrl, {
  logging: false,
});

export async function connectAndSync() {
  await sequelize.authenticate();
  await sequelize.sync();
}
