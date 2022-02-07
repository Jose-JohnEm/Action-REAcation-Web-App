import { json } from 'express'
import UserData from '../../models/users'

const getUserData = (req, res, next) => {
  console.log(req.headers['Bearer'])
  if (!req.headers['Bearer']) {
    next()
    return
  }
  UserData.findOne({
    certification: {
      accessToken: req.headers['Bearer'],
    },
  })
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    next()
  })
}

const signin = (req, res) => {
  try {
    UserData.findOne({
      email: req.query.email,
      password: req.query.password,
    })
      .then((user) => {
        res.json({accessToken: user.certification.accessToken})
      })
      .catch((err) => {
        res.status(500).json({error: err})
      })
  }
  catch (err) {
    res.status(500).json({error: err})
  }
}

export default [getUserData, signin]