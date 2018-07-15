const https = require('https')
const fs = require('fs')

const options = {
  hostname: 'localhost',
  port: 8443,
  path: '/',
  method: 'GET',
  ca: fs.readFileSync('./ca.crt')
}

const req = https.request(options, (res) => {
  res.on('error', (e) => {
    console.error(e.message)
  })
  res.on('data', (data) => {
    process.stdout.write(data)
  })
})

req.on('error', (e) => {
  console.error(e.message)
})

req.end()