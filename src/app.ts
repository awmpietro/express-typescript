import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

import { cors } from './libs';
import { sequelize } from './sequelize';
import * as Routes from './routes';

class App {
  private app: express.Application;
  private port: number | string = process.env.PORT || 8080;
  private accessLogStream: fs.WriteStream;
  private logsDir = path.join(__dirname, '../logs');

  constructor() {
    this.app = express();
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
    this.accessLogStream = fs.createWriteStream(`${this.logsDir}/access.log`, {
      flags: 'a',
    });
    this.app.use(logger('combined', { stream: this.accessLogStream }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(cors);
    this.routes();
    this.init();
  }

  routes() {
    this.app.use('/auth', Routes.Auth);
  }

  init() {
    (async () => {
      await sequelize.sync({ force: true });
      this.app.listen(this.port, () => {
        console.log(`App listening on port ${this.port}`);
      });
    })();
  }
}

const app = new App();

export default app;
