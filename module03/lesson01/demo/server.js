//const os = require('os');
// console.dir(os)
// console.log(os.cpus())

const http = require('http');

const form = `<form method='post'>
    login: <input name='login' require/>
    <br/>
    passw: <input type='password' name='password' require />
    <br/>
    <input type='submit'/>
</form>`;

const server = http.createServer(function (req, resp) {
    // запрос
    console.log("Method:", req.method);
    console.log("Url: ", req.url);
    console.log("Headers: ", req.headers);
    if (req.method == 'POST') {
        resp.end("<h1>Welcome to secret page!!!</h1>")
    } else {
        // формируем ответ
        resp.end(form);
    }
});

server.listen(3000, 'localhost', function () {
    console.log("Server started at " + new Date());
});