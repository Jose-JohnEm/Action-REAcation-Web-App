import UserData from '../../models/users'
import {NextFunction, Request, Response} from 'express';

/**
 * Delete all events of a user
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const deleteEvent = (req: Request, res: Response) => {
    console.log(parseInt(req.query.id as string))

    UserData.findOne({
        token: req.header('Authorization').split('Bearer ')[1],
    })
        .then((user) => {
            console.log(parseInt(req.query.id as string))
            user.events.splice(parseInt(req.query.id as string), 1)
            user.save()
                .then(result => {
                    res.json(user)
                })

        })
        .catch((err) => {
            console.error(err)
            res.json({'error': "Can't delete event"})
        })
}

export default deleteEvent;