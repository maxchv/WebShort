//const os = require('os');
// console.dir(os)
// console.log(os.cpus())

const http = require('http');

const server = http.createServer(function (req, resp) {
    // запрос
    console.log("Method:", req.method);
    console.log("Url: ", req.url);
    console.log("Headers: ", req.headers);

    // формируем ответ
    resp.end('Hello Web from Server');
});

server.listen(3000, 'localhost', function () {
    console.log("Server started at " + new Date());
});