const todo = require("./todo.js");
const student = require("./student.js");
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

app.get("/todo", todo.get);

app.post("/todo", todo.post);

app.get("/student/:id", student.get);


app.listen(3000, function () {
    console.log("Server started at " + new Date())
});