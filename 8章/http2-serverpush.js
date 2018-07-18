const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const {
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
  HTTP2_HEADER_PATH,
} = http2.constants

const getPath = (filePath) => path.join('./', filePath)

const serverPush = (stream, filePath) => {
  const pushHeaders = {
    [HTTP2_HEADER_PATH]: filePath
  }

  stream.pushStream(pushHeaders, (err, pushStream) => {
    if (err) console.log(err.message)
    pushStream.on('error', (err) => console.error(err))
    const headers = {
      [HTTP2_HEADER_CONTENT_TYPE]: 'image/png',
    }
    pushStream.respondWithFile(filePath, headers)
  })
}

const server = http2.createSecureServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
})

server.on('error', (err) => console.error(err.message))
server.on('stream', (stream, headers) => {
  serverPush(stream, getPath('./hoo.png'))
  stream.end('<html><body><h1>hey</h1><img src="hoo.png"/></body></html>')
})

server.listen(8443)