var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    var str = url.parse(request.url, true);
    var file = "." + str.pathname;
    var exten = path.extname(str.pathname);

    
    if (exten === ".html") {

        fs.readFile(file, function(err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                return response.end("404 Not Found");
            }
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(data);
            response.end();
        });
    } else {

        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        return response.end("404 Not Found");
    }


}).listen(1337);

console.log("Server running on port 1337!");