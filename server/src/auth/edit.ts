import UserData from '../../models/users'

const editAccount = (req, res, next) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  UserData.findOne({
    "certification.accessToken": req.header('Bearer')
  })
  .then((user) => {
    if (req.query.email !== undefined)
      user.email = req.query.email
    if (req.query.password !== undefined)
      user.password = req.query.password
    if (req.query.firstname !== undefined)
      user.data.firstname = req.query.firstname
    if (req.query.lastname !== undefined)
      user.data.lastname = req.query.lastname
    user.save()
      .then((result => res.json(result)))
  })
  .catch((err) => {
    console.log(err)
    next()
  })
}

const ifNotAccount = (req, res) => {
    res.json({error: 'Account doesn\'t exists'})
}

export default [editAccount, ifNotAccount]