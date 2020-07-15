const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, resp) => {
    //resp.send("<h1>Home page</h1><p><a href='/users'>Users</a></p>");
    //console.log("path", path.join(__dirname, "..", "views", "index.html"));
    //resp.sendFile(path.join(__dirname, "..", "views", "index.html"))
    resp.render("index");
});

module.exports = router;