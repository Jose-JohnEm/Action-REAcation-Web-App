import UserData from '../../models/users'
import { Request, Response, NextFunction } from 'express';

const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  
  console.log(parseInt(req.query.id as string))

  UserData.findOne({
    token: req.header('Bearer')
  })
    .then((user) => {
        console.log(parseInt(req.query.id as string))
        user.events.splice(parseInt(req.query.id as string), 1)
        user.save()
            .then(result => {
                console.log('Incroyable')
                res.json(user)
            })

    })
    .catch((err) => {
        console.error(err)
        next()
    })
}

const ifNotAccount = (req: Request, res: Response) => {
    res.status(500).json({error: 'No account with this token'})
}

export default [deleteEvent, ifNotAccount];