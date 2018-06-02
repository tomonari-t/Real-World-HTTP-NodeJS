const http = require('http');

const PORT = 18888;
const requestHandler = (request, response) => {
  const { headers, method, url } = request;

  let body = [];
  request.on('error', (err) => {
    response.writeHead(500);
    response.end();
    return;
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    body = Buffer(body).toString();
    response.on('error', () => {
      response.writeHead(500);
      response.end();
    });

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write('<html><body><h1>hello</h1></body></html>');
    response.end();
  });
};

(async () => {
  const server = http.createServer(requestHandler);
  server.listen(PORT);
  console.log(`start server at :${PORT}`);
})();