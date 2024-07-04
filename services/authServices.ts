import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY as string;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.query().findOne({ email });
    const checkPassword = user && bcrypt.compare(password, user.password)
    
    if (checkPassword) {
      const token = jwt.sign({ id: user.id, role: user.user_type }, secretKey, { expiresIn: '2d' });
      return res.status(200).json({ message: 'Success', token: token });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }  
  } catch (err) {
    res.status(500).json({ status: false, message: JSON.stringify(err) });
  }
}
