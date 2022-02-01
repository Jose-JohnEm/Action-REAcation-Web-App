import express from 'express'
import { networkInterfaces } from 'os'
import about_json from './src/about_json'
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about.json', about_json)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})