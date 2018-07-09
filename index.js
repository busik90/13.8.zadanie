var http = require('http'),
    fs = require('fs');

var server = http.createServer();

server.on('request', function (request, response) {

  if (request.method === 'GET') {
    switch (request.url) {
      case '/':
        fs.readFile('./index.html', 'utf-8', function(err, html) {
          response.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
          response.write(html);
          response.end();
        });
        break;
      case '/css/style.css':
        fs.readFile('./css/style.css', 'utf-8', function(err, css) {
          response.writeHead(200, {'Content-type': 'text/css; charset=utf-8'});
          response.write(css);
          response.end();
        });
        break;
      default:
        writeError();
    }
  } else {
    writeError();    
  }

  function writeError() {
    fs.readFile('./images/404.jpg', 'binary', function(err, img) {
      response.writeHead(404, {'Content-type': 'image/jpg'});
      response.write(img, 'binary');
      response.end();
    });
  };
});

server.listen(8080);

console.log("URL: 'http://localhost:8080'");