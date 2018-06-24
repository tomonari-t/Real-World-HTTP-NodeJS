const http = require('http')
const querystring = require('querystring')

const values = querystring.stringify({
  test: 'value'
})

const options = {
  hostname: 'localhost',
  port: 18888,
  path: '/',
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': Buffer.byteLength(values)
  }
}

const req = http.request(options, (res) => {
  console.log(res.statusCode)
  console.log(res.headers)
  const data = []
  res.on('data', (chunk) => {
    console.log(chunk)
    data.push(chunk)
  })
  res.on('end', () => {
    console.log(Buffer.concat(data).toString())
    console.log('done')
  })
})

req.on('error', e => {
  console.error(e.message)
})

req.write(values)
req.end()