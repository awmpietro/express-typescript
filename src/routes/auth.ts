import express from 'express';
import AuthHandler from '../handlers/auth';

class Auth {
  static authRouter: express.Router;

  static generateRouters() {
    this.authRouter = express.Router();

    this.authRouter.post('/login', AuthHandler.loginHandler);
    this.authRouter.post('/register', AuthHandler.registerHandler);

    return this.authRouter;
  }
}

export default Auth.generateRouters();
