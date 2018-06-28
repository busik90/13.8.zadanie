var http = require('http'),
    fs = require('fs');

var server = http.createServer();

var indexHTML,
    error404;

// Wczytuje sam plik html bez podpiętego do niego pliku css
fs.readFile('./index.html', 'utf-8', function(err, data){
  if (err) throw err;
  indexHTML = data;
});

fs.readFile('./images/404.jpg', function(err, data) {
  if (err) throw err;
  error404 = data;
});

// Jak wczytać plik HTML z obrazem?
// Wyświetla mi się tylko tekst z atrybutu "alt", ponieważ nie udało wczytać się obrazu.
// fs.readFile('./404.html', 'utf-8', function(err, data) {
//   if (err) throw err;
//   error404 = data;
// });

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