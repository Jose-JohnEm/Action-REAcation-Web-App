import UserData from '../../models/users'
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export const getUser = async (req: Request, res: Response) => {
  const token: string = req.headers.authorization || '';
  const parsedToken = token.substring(7, token.length);

  try {
    const user = await UserData.findOne({ token: parsedToken });
    if (!user)
      return res.status(400).json({ error: 'User doesn\'t exist.' });
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const cleanObj = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};


export const editUser = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const token: string = req.headers.authorization || '';
  const parsedToken = token.substring(7, token.length);

  try {
    let user = await UserData.findOne({ token: parsedToken });
    const userCheck = await UserData.findOne({ email: email });

    if (!user)
      return res.status(400).json({ error: 'User doesn\'t exist.' });
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords must match.' });
    if (email && userCheck?.email === email && userCheck?._id.toString() !== user._id.toString())
      return res.status(400).json({ error: 'This email is already used.' });

    user = await UserData.findOneAndUpdate({ _id: user._id }, { $set: req.body }, { returnOriginal: false });

    if (password && (password !== user?.password)) {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      user = await UserData.findOneAndUpdate({ _id: user?._id }, { $set: { password: hashedPassword } }, { returnOriginal: false });
    } else if (email && user?.email !== email)
      user = await UserData.findOneAndUpdate({ _id: user?._id }, { $set: { verifiedEmail: false } }, { returnOriginal: false });

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const token: string = req.headers.authorization || '';
  const parsedToken = token.substring(7, token.length);

  try {
    const deletedUser = await UserData.findOne({ token: parsedToken });

    if (!deletedUser)
      return res.status(400).json({ error: 'User doesn\'t exist.' });

    await UserData.findByIdAndDelete(deletedUser._id);
    res.status(200).json({
      status: 'success',
      message: 'User has been deleted.'
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUserServices = async (req: Request, res: Response) => {
  const token: string = req.headers.authorization || '';
  const parsedToken = token.substring(7, token.length);
  const { services } = req.body;

  try {
    let user = await UserData.findOne({ token: parsedToken });
    if (!user)
      return res.status(400).json({ error: 'User doesn\'t exist.' });
    user = await UserData.findOneAndUpdate({ _id: user._id }, {
      $set: { services: services }
    }, { returnOriginal: false });

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};