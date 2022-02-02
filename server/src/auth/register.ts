import UserData from '../../models/users'

const tryIfEmailAlreadyExists = (req, res, next) => {
    console.log("coucou");
    
    UserData.findOne({email: req.query.email})
        .then((result) => {
            console.log(result.email + '\n' + req.query.email)
            if (result.email === req.query.email)
                res.status(500).json({error: (req.query.email + ' already exists...')})
            else
                next()
        })
        .catch((err : object) => {
            next()
        })
}
  
const addAccount = (req, res) => {
    try {
        const user = new UserData(req.query)
        user.save()
            .then((result) => {
                res.json(user)
            })
            .catch((err) => {
                res.status(500).json({error: err})
            })
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export default [tryIfEmailAlreadyExists, addAccount]