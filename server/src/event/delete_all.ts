import UserData from '../../models/users'
import {NextFunction, Request, Response} from 'express';

/**
 * Delete all events of a user
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
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

/**
 * Reply when the user is not found
 * @param req Request
 * @param res Response
 */
const ifNotAccount = (req: Request, res: Response) => {
    res.status(500).json({error: 'No account with this token'})
}

export default [deletaAll, ifNotAccount];