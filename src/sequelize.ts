import { Sequelize } from 'sequelize-typescript';

// Need to have a running postgres instance running, change options, in order - database, user, password, host - to your case
export const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  String(process.env.DB_PASS),
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    models: [__dirname + '/models'],
    logging: true,
  }
);
