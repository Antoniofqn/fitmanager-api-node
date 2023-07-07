import Sequelize from 'sequelize';
import db from '../repositories/database.js';

const Exercise = db.define('Exercise', {
  exerciseId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  muscle_group: {
    type: Sequelize.ENUM('arms', 'legs', 'chest', 'back', 'shoulders', 'abs', 'full_body'),
    allowNull: false,
  },
});

export default Exercise;
