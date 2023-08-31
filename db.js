import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize('restaurant', 'root', process.env.PASSWORD_DB, {
  host: process.env.HOST,
  dialect: 'mysql'
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}