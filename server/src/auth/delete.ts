import UserData from '../../models/users'


const deleteAccount = (req, res, next) => {
  if (!req.header('Bearer')) {
    next()
    return
  }
  UserData.findOneAndDelete({
    "certification.accessToken": req.header('Bearer')
  })
  .then((user) => {
    res.json({'status': 'Account is deleted'})
  })
  .catch((err) => {
    next()
  })
}

const ifNotAccount = (req, res) => {
    res.json({error: 'Account doesn\'t exists'})
}


export default [deleteAccount, ifNotAccount]