import dbConfig from '../config/database.json';
import Sequelize from 'sequelize';

const database = (databaseName = '') => {
  const dbName = databaseName ? { database: databaseName } : {};

  const config = {
    ...dbConfig.development,
    ...dbName
  };

  return new Sequelize({
    ...config,
    logging: console.log,
  });
};

export default database;
