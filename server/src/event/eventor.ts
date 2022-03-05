import addEvent from './add_event'
import deleteEvent from './delete_event'
import deleteAllEvent from './delete_all'
import express, { Request, Response, Router } from 'express'

const router : Router = express.Router()

const invalidMethod = (req: Request, res: Response) => {
  res.status(404).json({'error': 'Invalid Method'})
}

router.delete('/all', deleteAllEvent)

router.route('/')
  .post(addEvent)
  .delete(deleteEvent)
  .all(invalidMethod)

export default router