const fs = require("fs");
const express = require("express");
const app = express();

app.use(function (request, response, next) {
    console.log("Middleware for " + request.url);
    next();
});

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: false
}));

app.get("/", function (request, response) {
    response.send("<h1>Привет Web using ExpressJs</h1>" +
        "<ul><li><a href='/todo'>Todo</a></li></ul>")
});

app.get("/about", function (request, response) {
    response.send("<h1>About this site</h1>")
});

app.get("/todo", function (request, response) {
    response.sendFile(__dirname + "/public/todo.html");
});

app.post("/todo", function (request, response) {
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
});

const students = [{
        name: "Вася",
        age: 19
    },
    {
        name: "Маша",
        age: 23
    },
    {
        name: "Рома",
        age: 17
    },
];

app.get("/student/:id", function (request, response, next) {
    let id = parseInt(request.params.id);
    if (!isNaN(id)) {
        let idx = id - 1;
        let s = students[idx];
        response.send(`<h1>${s.name}, ${s.age}</h1>`);
    }
    response.send(`Id = ${request.params.id}`);
});


app.listen(3000, function () {
    console.log("Server started at " + new Date())
});