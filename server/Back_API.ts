import express from 'express'
import ngrok from 'ngrok'
import aboutJson from './src/aboutJson'
import mongoose from 'mongoose'
import authenticator from './src/auth/authenticator'
import webhooks from './src/webhooks/webhooks'
import dotenv from 'dotenv'
import area from './src/event/eventor'
import startDiscord from "./src/event/reaction/Discord/discord";
import {startEvent, startOneTimeEvent} from './src/webhooks/startEvent';
import {cron_timer} from "./src/event/action/Timer/timer";

dotenv.config()

const app = express()
const port = (parseInt(process.argv[2]) < 65536) ? parseInt(process.argv[2]) : 8080

app.use(express.json());

///// Connect MongoDB and Server /////
const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';


const successServerStarted = () => {
    console.log(`MongoDB Connected succesfully !\nExample app listening at http://localhost:${port}`)
}

(async () => {
    try {
        // create a fucntion that wait all server to be started
        const url = await ngrok.connect(port)
        process.env.URL = url;
        console.log(`ngrok connected at ${url}`)
        // Start discord
        await startDiscord()
        // Start mongo
        await mongoose.connect(dbURI)
        // Start app
        await app.listen(port, successServerStarted)
        // Start Area
        startArea()
    } catch (error) {
        console.log(error)
    }
})();

function startArea() {
    // Start one time event
    startOneTimeEvent().then(() => {
        console.log("One time event started")
    })
    // Start loop event
    startEvent().then(() => {
        console.log("Loop event started")
    })
    setInterval(startEvent, 15000)
}


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