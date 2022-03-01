import { deleteUser, editUser, signin, signup } from './user'
import auth from '../middleware/auth';
import express from 'express'

const router = express.Router()

router.post('/signin', signin);
router.post('/signup', signup)
router.post('/api/user/delete/', auth, deleteUser);
router.post('/api/user/edit/', auth, editUser);

export default router