import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import { User } from './User.js';

export class TrackingEvent extends Model {}

TrackingEvent.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventName: { type: DataTypes.STRING, allowNull: false },
    page: { type: DataTypes.STRING, allowNull: false },
    metadata: { type: DataTypes.JSON, allowNull: true },
  },
  { sequelize, modelName: 'TrackingEvent' }
);

User.hasMany(TrackingEvent, { foreignKey: 'userId' });
TrackingEvent.belongsTo(User, { foreignKey: 'userId' });
