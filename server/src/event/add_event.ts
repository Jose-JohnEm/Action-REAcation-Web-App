import UserData from '../../models/users'
import {NextFunction, Request, Response} from 'express';

/**
 * Remove event from database
 * @param index index of event
 * @param id id of user
 */
const removeEvent = (index: number, id: string) => {
    UserData.findOne({_id: id})
        .then((user) => {
            if (user === undefined)
                throw new Error('User not found')
            user.events.push()
            user.save()
        })
        .catch(e => console.error(e))
}

/**
 * Add event to database
 * @param req request
 * @param res response
 * @param next next function
 */
const addEvent = (req: Request, res: Response) => {
    UserData.findOne({
        token: req.header('Bearer')
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