import Sequelize from 'sequelize';
import db from '../repositories/database.js';
import User from "./user.model.js"

const Routine = db.define('Routine', {
  routineId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  UserId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'UserId',
    }
  }
});

User.hasMany(Routine);
Routine.belongsTo(User);

export default Routine;
