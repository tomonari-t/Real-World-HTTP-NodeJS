const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
  const data = fs.createReadStream('./test.json')
  req.on('end', () => console.log('request end'))
  res.on('error', (e) => {
    console.error(e.message)
    // Vecause if error occurd, `Writable' is not closed automatically
    res.end()
  })
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Transfer-Encoding': 'chunked',
  })
  data.pipe(res)
})
server.listen(9000)
