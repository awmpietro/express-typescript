import express from "express";

class HomeHandler {
  homePageHandler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.json("Home Page");
  }
}

export default new HomeHandler();
