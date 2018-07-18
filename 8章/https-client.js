const http2 = require('http2')


const client = http2.connect('https://google.com')
const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
} = http2.constants

client.on('error', (e) => console.error(e.message))

const req = client.request({ [HTTP2_HEADER_PATH]: '/' })
req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`)
  }
})
let data = []
req.on('data', (chunk) => data.push(chunk))
req.on('end', () => {
  client.close()
  console.log(Buffer.concat(data).toString())
})
req.end()