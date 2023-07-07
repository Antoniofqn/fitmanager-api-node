import Sequelize from 'sequelize';
import db from '../repositories/database.js';
import Routine from "./routine.model.js";
import Exercise from "./exercise.model.js";

const RoutineExercise = db.define('RoutineExercise', {
  sets: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reps: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  RoutineId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Routines',
      key: 'routineId',
    }
  },
  ExerciseId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Exercises',
      key: 'exerciseId',
    }
  },
});

Routine.belongsToMany(Exercise, { through: RoutineExercise });
Exercise.belongsToMany(Routine, { through: RoutineExercise });

export default RoutineExercise;
