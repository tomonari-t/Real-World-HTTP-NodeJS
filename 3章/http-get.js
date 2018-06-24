const http = require('http')

http.get('http://localhost:18888', (res) => {
  const { statusCode } = res
  console.log(statusCode)
  if (statusCode !== 200) {
    console.error(`Status code: ${statusCode}`)
    res.resume()
    return
  }

  res.setEncoding('utf8')
  const data = []
  res.on('data', chunk => { data.push(chunk) })
  res.on('end', () => {
    const body = data.join('')
    console.log(body)
  })

}).on('error', e => {
  console.error(e.message)
})
