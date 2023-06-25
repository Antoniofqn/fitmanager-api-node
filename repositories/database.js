import Sequelize from 'sequelize';
import config from '../config.js';

const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

sequelize.sync()

export default sequelize;
