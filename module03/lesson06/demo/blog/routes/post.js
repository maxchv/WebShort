const express = require("express");
const router = express.Router();
const db = require("../db/memory");

router.get("/:id?", (req, resp) => {
    console.log(req.params.id);
    resp.render("post", {
        post: db.find(req.params.id)
    });
});

module.exports = router;