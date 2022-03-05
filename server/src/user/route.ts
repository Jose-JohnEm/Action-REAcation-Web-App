import express from 'express'
import { deleteUser, editUser, getUser, updateUserServices } from './user';

const userRouter = express.Router()

userRouter.get('/user/', getUser);
userRouter.post('/user/', editUser);
userRouter.get('/deleteuser/', deleteUser);
userRouter.post('/user/services', updateUserServices);

export default userRouter