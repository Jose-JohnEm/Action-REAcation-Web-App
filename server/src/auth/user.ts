import UserData from '../../models/users'
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const secret: string = process.env.SECRET_JWT || ''

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await UserData.findOne({ email });

    if (user) {
      const validPassword: boolean = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token: string = jwt.sign({ id: user._id, email }, secret, { expiresIn: '1d' });
        user = await UserData.findOneAndUpdate({ _id: user._id }, { $set: { token: token } }, { returnOriginal: false });
        res.status(200).json({
          status: 'success',
          data: user,
          token
        });
      } else {
        return res.status(400).json({ error: 'Invalid password.' });
      }
    } else {
      if (!user)
        return res.status(404).json({ error: 'User doesn\'t exist.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const checkUser = await UserData.findOne({ email });

    if (checkUser)
      return res.status(400).json({ error: 'User already exists.' });
    else if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords must match.' });
    const hashedPassword: string = await bcrypt.hash(password, 10);
    let user = await UserData.create({
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      email: email
    });
    const token: string = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

    if (user)
      user = await UserData.findOneAndUpdate({ _id: user._id }, { $set: { token: token } }, { returnOriginal: false });

    return res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};