import express from 'express';
import HomeHandler from '../handlers/home';

class Home {
  static homeRouter: express.Router;

  static generateRouters() {
    this.homeRouter = express.Router();

    this.homeRouter.get('/', HomeHandler.homePageHandler);

    return this.homeRouter;
  }
}

export default Home.generateRouters();
