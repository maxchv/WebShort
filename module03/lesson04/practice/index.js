const express = require("express");
const fs = require("fs");
const app = express();

// підключаю статичні файли
app.use(express.static("public"));
// підключаю декодування тіло запросу
app.use(express.urlencoded({
    extended: false
}));

let random;

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/template/index.html");
});

app.get("/start", function (request, response) {
    random = Math.round(Math.random() * 100);
    console.log("Random", random);
    response.redirect("/game");
});

app.get("/game", function (request, response) {
    fs.readFile(__dirname + "/template/game.html", {
        encoding: "utf-8"
    }, function (err, html) {
        html = html.replace("{{comment}}", "New game");
        response.send(html);
    });
});

app.post("/game", function (request, response) {
    if (!request.body) return;
    let comment;
    let guess = parseInt(request.body.guess);
    if (guess > random) {
        comment = "Less";
    } else if (guess < random) {
        comment = "Higer";
    } else {
        comment = "You are guess";
    }

    fs.readFile(__dirname + "/template/game.html", {
        encoding: "utf-8"
    }, function (err, html) {
        html = html.replace("{{comment}}", comment);
        response.send(html);
    });
});

app.listen(3000);