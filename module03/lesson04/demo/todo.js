const fs = require("fs");

module.exports = {
    get: function (request, response) {
        response.sendFile(__dirname + "/public/todo.html");
    },
    post: function (request, response) {
        console.log(request.body);
        const task = request.body.task;
        fs.appendFile(__dirname + "/db/todo.txt", task + "\n", function () {

        });

        fs.readFile(__dirname + "/public/todo.html", {
            encoding: "utf-8"
        }, function (err, html) {
            html = html.replace("{{todo}}", task);
            response.send(html);
        });
        //response.sendFile(__dirname + "/public/todo.html");
    }
};