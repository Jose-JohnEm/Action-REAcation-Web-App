import addEvent from './add_event'
import deleteEvent from './delete_event'
import deleteAllEvent from './delete_all'

import express from 'express'
const router = express.Router()

const invalidMethod = (req, res) => {
  res.status(404).json({'error': 'Invalid Method'})
}

router.delete('/all', deleteAllEvent)


router.route('/')
//   .get(getEvent)
  .post(addEvent)
//   .put(editEvent)
  .delete(deleteEvent)
  .all(invalidMethod)


export default router