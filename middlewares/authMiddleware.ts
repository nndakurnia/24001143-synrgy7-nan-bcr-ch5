import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/request';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  id: number;
  role: 'admin' | 'customer';
}

const auth = {
  authenticate: (req: UserRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'No authorization header!' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format!' });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token!' });
    }
  },

  authorize: (roles: ('admin' | 'customer')[]) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user?.role)) {
        return res.status(403).json({ message: 'Forbidden!' });
      }
      next();
    }
  },
}

export default auth;
