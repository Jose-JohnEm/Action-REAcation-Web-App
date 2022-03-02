import UserData from '../../models/users'

const deleteEvent = (req, res, next) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  
  console.log(parseInt(req.query.id))

  UserData.findOne({
    token: req.header('Bearer')
  })
    .then((user) => {
        console.log(parseInt(req.query.id))
        user.events.splice(parseInt(req.query.id), 1)
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

const ifNotAccount = (req, res) => {
    res.status(500).json({error: 'No account with this token'})
}

export default [deleteEvent, ifNotAccount];