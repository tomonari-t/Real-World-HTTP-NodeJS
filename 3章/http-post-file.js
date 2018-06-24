const http = require('http')
const fs = require('fs')

const file = fs.readFileSync('./hoo.txt')

const options = {
  hostname: 'localhost',
  port: 18888,
  path: '/',
  method: 'POST',
  headers: {
    'content-type': 'text/plain',
    'content-length': Buffer.byteLength(file)
  }
}

const req = http.request(options, (res) => {
  console.log(res.statusCode)
})

req.write(file)
req.end()
