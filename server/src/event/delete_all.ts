import UserData from '../../models/users'

const deletaAll = (req, res, next) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  UserData.findOne({
    "certification.accessToken": req.header('Bearer')
  })
    .then((user) => {
        console.log(parseInt(req.query.id))
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

const ifNotAccount = (req, res) => {
    res.status(500).json({error: 'No account with this token'})
}

export default [deletaAll, ifNotAccount];