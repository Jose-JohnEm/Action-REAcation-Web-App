import { json } from 'express'
import UserData from '../../models/users'

const getUserData = (req, res, next) => {
  console.log(req.header('Bearer'))
  if (!req.header('Bearer')) {
    next()
    return
  }
  UserData.findOne({
    "certification.accessToken": req.header('Bearer')
  })
  .then((user) => {
    console.log("User :\n", user)
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