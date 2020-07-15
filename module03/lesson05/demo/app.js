const express = require("express");
const app = express();

const home = require("./routers/index.js");
const users = require("./routers/users.js");

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static("public"));

app.use(home);
app.use("/users", users); // /users, /users/add

app.listen(3000);