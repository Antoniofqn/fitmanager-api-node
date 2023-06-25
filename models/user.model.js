import Sequelize from 'sequelize';
import db from '../repositories/database.js';

const User = db.define('User', {
  UserId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM('trainer', 'client'),
    allowNull: false,
    defaultValue: 'client'
  },
  trainer_email: {
    type: Sequelize.STRING
  }
});

export default User;
