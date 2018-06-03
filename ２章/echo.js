const http = require('http');

const PORT = 18888;
const requestHandler = (request, response) => {
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
    body = Buffer.concat(body).toString();
    const { headers, method, url } = request;
    const requestHederList = [];
    for (let headerItem of Object.keys(headers)) {
      requestHederList.push(`\t${headerItem}: ${headers[headerItem]}`);
    }

    console.log(`
Method: ${method}
URI: ${url}
Headers:
${requestHederList.join('\n')}

${body}
`);

    response.on('error', () => {
      response.writeHead(500);
      response.end();
    });

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'VISIT=TRUE'
    });
    if (headers['cookie']) {
      response.end('<html><body>２回目以降ですね</body></html>');
    } else {
      response.end('<html><body>初めまして</body></html>');
    }

  });
};

(async () => {
  const server = http.createServer(requestHandler);
  server.listen(PORT);
  console.log(`start server at :${PORT}`);
})();