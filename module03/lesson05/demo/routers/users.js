const express = require("express");
const router = express.Router();

router.get("/", (req, resp) => {
    resp.send("<h1>User page</h1><p><a href='/users/add'>Add</a></p>");
});

router.get("/add", (req, resp) => {
    resp.send("<h1>Add new user</h1>")
});

module.exports = router;