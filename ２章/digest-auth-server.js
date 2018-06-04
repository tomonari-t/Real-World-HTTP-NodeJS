const http = require('http');

const PORT = 18888;

const handleDigestAuth = (request, response) => {
  const body = [];
  request.on('error', err => {
    response.writeHead(500);
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const { headers, method, url } = request;

    console.log(url);
    console.log(headers);
    console.log(method);

    if (!headers['Authorization']) {
      response.writeHead(401, {
        'www-authenticate': `Digest realm="Secret Zone",
nonce="1234567890",
algorithm=MD5,
qop="auth"`
      });
      response.end();
    } else {
      response.writeHead(200);
      response.end('<html><body>secret page</body></html>');
    }
    return;
  });
};

(async () => {
  const server = http.createServer(handleDigestAuth);
  server.listen(PORT);
  console.log(`start server at :${PORT}`);
})();