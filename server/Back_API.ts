import express from 'express'
import { networkInterfaces } from 'os'
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about.json', (req,res) => {
  const nets = networkInterfaces();
  const results : object = {};

  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  res.send({client: results['eth0'][0]})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})