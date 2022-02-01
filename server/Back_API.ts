import express from 'express'
import about_json from './src/about_json'
import mongoose from 'mongoose'

///// Connect MongoDB and Server /////
const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(port, successServerStarted))
  .catch((error) => console.log(error));

const app = express()
const port = (parseInt(process.argv[2]) < 65536) ? parseInt(process.argv[2]) : 8080

const successServerStarted = () => {
  console.log(`MongoDB Connected succesfully !\nExample app listening at http://localhost:${port}`)
}


///// Routes /////
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about.json', about_json)


