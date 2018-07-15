const fs = require('fs')
const https = require('https')

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
}

const handleRequest = (req, res) => {
  let data = []

  req.on('error', () => {
    res.writeHead(500)
    res.end()
    return
  })

  req.on('data', (chunk) => {
    data.push(chunk)
  })

  req.on('end', () => {
    data = Buffer.concat(data)
  })

  console.log(data)

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  })
  res.end('<html><body>初めまして</body></html>')
}

(async () => {
  try {
    const server = https.createServer(options, handleRequest)
    server.listen(8443)
  } catch (e) {
    console.error(e.message)
  }
})()
