import UserData from '../../models/users'
import {NextFunction, Request, Response} from 'express';

/**
 * Add event to database
 * @param req request
 * @param res response
 * @param next next function
 */
const addEvent = (req: Request, res: Response) => {
    UserData.findOne({
        token: req.header('Authorization').split('Bearer ')[1],
    })
        .then((user) => {
            console.log(req.query.action_params)
            user.events.push({
                name: req.query.area_name,
                action: {
                    service: req.query.action_service,
                    name: req.query.action_name,
                    params: (req.query.action_params) ? JSON.parse(decodeURI(req.query.action_params as string)) : []
                },
                reaction: {
                    service: req.query.reaction_service,
                    name: req.query.reaction_name,
                    params: (req.query.reaction_params) ? JSON.parse(decodeURI(req.query.reaction_params as string)) : []
                }
            })
            user.save()
                .then(result => {
                    res.json(user)
                })
        })
        .catch((err) => {
            console.error(err)
            res.json({'error': "can't add event"})
            return
        })
}

export default addEvent;