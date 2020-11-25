/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

class AuthHandler {
  async loginHandler(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'password'],
      });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign({ email }, process.env.SECRET_KEY!, {
            expiresIn: '24h',
          });
          res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
        } else {
          return res.status(401).json('Email or password invalid');
        }
      } else {
        return res.status(401).json('Email or password invalid');
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async registerHandler(req: express.Request, res: express.Response) {
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email }, process.env.SECRET_KEY!, {
        expiresIn: '24h',
      });
      return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new AuthHandler();
