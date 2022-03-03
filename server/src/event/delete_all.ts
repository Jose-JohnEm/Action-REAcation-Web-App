import UserData from '../../models/users'
import { Request, Response, NextFunction } from 'express';

const deletaAll = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  UserData.findOne({
    token: req.header('Bearer')
  })
    .then((user) => {
        console.log(parseInt(req.query.id as string))
        user.events = []
        user.save()
            .then(result => {
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

export default [deletaAll, ifNotAccount];