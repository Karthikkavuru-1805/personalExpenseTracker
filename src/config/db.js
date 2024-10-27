const { Sequelize } = require('sequelize'); 
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  schema: 'finance',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectDB };


sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
