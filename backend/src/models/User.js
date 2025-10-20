import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('student', 'admin'), allowNull: false, defaultValue: 'student' },
  },
  { sequelize, modelName: 'User' }
);
