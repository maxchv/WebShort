const express = require("express");
const app = express();

app.get("/", function (request, response) {
    response.send("<h1>Привет Web using ExpressJs</h1>")
});

app.get("/about", function (request, response) {
    response.send("<h1>About this site</h1>")
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