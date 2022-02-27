import express from 'express'
import aboutJson from './src/aboutJson'
import mongoose from 'mongoose'
import authenticator from './src/auth/authenticator'
import webhooks from './src/webhooks/webhooks'
import dotenv from 'dotenv'
import area from './src/event/eventor'
import startDiscord from "./src/event/reaction/Discord/discord";

dotenv.config()

const app = express()
const port = (parseInt(process.argv[2]) < 65536) ? parseInt(process.argv[2]) : 8080


///// Connect MongoDB and Server /////

const successServerStarted = () => {
    console.log(`MongoDB Connected succesfully !\nExample app listening at http://localhost:${port}`)
}

const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(port, successServerStarted))
    .catch((error) => console.log(error));

///// Start Discord /////
startDiscord().then(r => console.log("Area: Discord started"));

///// Add custom debug middleware /////
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

///// Routes /////
app.get('/', (req, res) => {
    res.send('Welcome !')
})
app.get('/about.json', aboutJson)
app.use('/auth', authenticator)
app.use('/area', area)
app.use('/webhooks', webhooks)

export default app