import express from 'express'
import ngrok from 'ngrok'
import aboutJson from './src/aboutJson'
import mongoose from 'mongoose'
import authenticator from './src/auth/authenticator'
import webhooks from './src/webhooks/webhooks'
import dotenv from 'dotenv'
import area from './src/event/eventor'
import startDiscord from "./src/event/reaction/Discord/discord";
import startSlackBot from "./src/event/reaction/Slack/slack";
import {startEvent} from './src/webhooks/startEvent';
import userRouter from './src/user/route'

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
        if (!process.env.URL)
            process.env.URL = await ngrok.connect(port)
        console.log(`ngrok connected at ${process.env.URL}`)
        // Start discord
        await startDiscord()
        // Start slack
        await startSlackBot()
        // Start mongo
        await mongoose.connect(dbURI)
        // Start app
        await app.listen(port, successServerStarted)
        // Start Area
        await startArea()
    } catch (error) {
        console.log(error)
    }
})();

async function startArea() {
    // Start loop event
    startEvent().then(async () => {
        console.log("Loop event started")
        setInterval(await startEvent, 15000)
    })
}


///// Add custom debug middleware /////
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

///// CORS /////
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

///// Routes /////
app.get('/', (req, res) => {
    res.send('Welcome !')
})
app.get('/about.json', aboutJson)
app.use('/auth', authenticator)
app.use('/area', area)
app.use('/webhooks', webhooks)
app.use(userRouter);

export default app