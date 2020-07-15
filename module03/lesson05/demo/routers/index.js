const express = require("express");
const router = express.Router();

router.get("/", (req, resp) => {
    resp.send("<h1>Home page</h1><p><a href='/users'>Users</a></p>");
});

module.exports = router;