import UserData from '../../models/users'

const removeEvent = (index: number, id: string) => {
    UserData.findOne({ _id: id })
        .then((user) => {
            if (user === undefined)
                throw new Error('User not found')
            user.events.push()
            user.save()
        })
        .catch(e => console.error(e))
}

const addEvent = (req, res, next) => {
  if (!req.header('Bearer')) {
    next()
    return
  }

  UserData.findOne({
    "certification.accessToken": req.header('Bearer')
  })
    .then((user) => {
        console.log(req.query.action_params)
        user.events.push({
            name: req.query.area_name,
            action: {
                service: req.query.action_service,
                name: req.query.action_name,
                params: (req.query.action_params) ? JSON.parse(decodeURI(req.query.action_params)) : []
            },
            reaction: {
                service: req.query.reaction_service,
                name: req.query.reaction_name,
                params: (req.query.reaction_params) ? JSON.parse(decodeURI(req.query.reaction_params)) : []
            }
        })
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

const ifNotAccount = (req, res) => {
    res.status(500).json({error: 'No account with this token'})
}

export default [addEvent, ifNotAccount];