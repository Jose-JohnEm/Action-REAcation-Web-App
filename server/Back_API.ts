import express from 'express'
import ngrok from 'ngrok'
import aboutJson from './src/aboutJson'
import mongoose from 'mongoose'
import authenticator from './src/auth/authenticator'
import webhooks from './src/webhooks/webhooks'
import dotenv from 'dotenv'
import area from './src/event/eventor'
import startDiscord from "./src/event/reaction/Discord/discord";
import loopInterval from './src/webhooks/loopInterval';

dotenv.config()

const app = express()
const port = (parseInt(process.argv[2]) < 65536) ? parseInt(process.argv[2]) : 8080

app.use(express.json());

///// Connect MongoDB and Server /////

const successServerStarted = () => {
    console.log(`MongoDB Connected succesfully !\nExample app listening at http://localhost:${port}`)
    console.log(`SECRET ${process.env.SECRET_JWT}`)
}

const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(port, successServerStarted)
        loopInterval()
        setInterval(loopInterval, 15000)
    })
    .catch((error) => console.log(error));

// Sstart ngrok
(async () => {
    const url = await ngrok.connect(port)
    process.env.URL = url;
    console.log(`ngrok connected at ${url}`)
})();

// Start discord
(async () => {
    try {
        await startDiscord()
    } catch (error) {
        console.log(error)
    }
})();


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