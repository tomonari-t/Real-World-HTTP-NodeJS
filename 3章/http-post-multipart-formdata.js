const http = require('http')
const FormData = require('form-data')
const fs = require('fs')

const form = new FormData()
form.append('name', 'test')
form.append('thumbnail', 'test')
form.append('data', fs.readFileSync('./thumbnail.png'))

const options = {
  hostname: 'localhost',
  port: 18888,
  path: '/',
  method: 'POST',
  headers: form.getHeaders()
}

const req = http.request(options, (res) => {
  console.log(res.statusCode)
})

form.pipe(req)
