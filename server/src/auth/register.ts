import UserData from '../../models/users'

const verifyAccount = (req, res, next) => {
  let interests = {
    email: req.query.email,
    password: req.query.password,
    certification: {
      verified: false,
      code: req.query.code
    }
  }

  UserData.findOne(interests)
    .then((finded) => {
      console.log(finded)
      finded.certification.verified = true
      finded.save()
        .then((suc) => {
          res.json({message: "Account now verified !"})
        })
    })
    .catch((err) => {
      next()
    })
}

const tryIfEmailAlreadyExists = (req, res, next) => {
  UserData.findOne({email: req.query.email})
    .then((result) => {
      if (result.email === req.query.email)
        res.status(500).json({error: (req.query.email + ' already exists...')})
      else
        next()
    })
    .catch((err : object) => next())
}
  
const addAccount = (req, res) => {
  try {
    const user = new UserData(req.query)
    user.save()
      .then((result) => res.json(user))
      .catch((err) => res.status(500).json({error: err}))
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export default [verifyAccount, tryIfEmailAlreadyExists, addAccount]