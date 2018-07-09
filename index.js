var http = require('http'),
    fs = require('fs');

var server = http.createServer();

var indexHTML,
    error404;

fs.readFile('./index.html', 'utf-8', function(err, data){
  if (err) throw err;
  indexHTML = data;
});

fs.readFile('./images/404.jpg', function(err, data) {
  if (err) throw err;
  error404 = data;
});

server.on('request', function (request, response) {

  if (request.method === 'GET' && request.url === '/') {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.write(indexHTML);
  } else {
    response.setHeader("Content-Type", "image/jpg");
    response.statusCode = 404;
    response.write(error404);
  }

  response.end();
});

server.listen(8080);

console.log("URL: 'http://localhost:8080'");