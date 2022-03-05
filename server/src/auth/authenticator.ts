import { signin, signup } from './user'
import auth from '../middleware/auth';
import express from 'express'

const router = express.Router()

router.post('/signin', signin);
router.post('/signup', signup)

export default router