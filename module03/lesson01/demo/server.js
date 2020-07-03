//const os = require('os');
// console.dir(os)
// console.log(os.cpus())

const http = require('http');
const {
    resolve
} = require('path');

const form = `<form method='post'>
    Login: <input name='login' required />
    <br/>
    Passw: <input type='password' name='password' required />
    <br/>
    <input type='submit'/>
</form>`;

const server = http.createServer(function (req, resp) {
    // запрос
    console.log("Method:", req.method);
    console.log("Url: ", req.url);
    console.log("Headers: ", req.headers);

    resp.setHeader('Content-Type', 'text/html');

    if (req.method == 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function (data) {
            console.log(body);
            let parts = body.split('&');
            let login = '';
            let password = '';
            for (let part of parts) {
                let p = part.split('=');
                if (p[0] == 'login') {
                    login = p[1];
                } else if (p[0] == 'password') {
                    password = p[1];
                }
            }
            if (login == 'admin' && password == '123') {
                resp.end("<h1>Welcome to secret page!!!</h1>");
            } else {
                resp.statusCode = 403;
                resp.end("<h1>Forbidden</h1>");
            }
        });

    } else {
        // формируем ответ
        resp.end(form);
    }
});

server.listen(3000, 'localhost', function () {
    console.log("Server started at " + new Date());
});