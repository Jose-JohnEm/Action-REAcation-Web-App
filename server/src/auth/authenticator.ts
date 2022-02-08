import UserData from '../../models/users'

import registerAccount from './register'
import connectAccount from './connect'
import deleteAccount from './delete'
import editAccount from './edit'

import express from 'express'
const router = express.Router()

const invalidMethod = (req, res) => {
  res.status(404).json({'error': 'Invalid Method'})
}

router.route('/')
  .get(connectAccount)
  .post(registerAccount)
  .put(editAccount)
  .delete(deleteAccount)
  .all(invalidMethod)


export default router