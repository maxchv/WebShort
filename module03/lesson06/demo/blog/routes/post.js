const express = require("express");
const router = express.Router();
const db = require("../db/memory");
const mongo = require("../db/mongo");

router.get("/:id?", (req, resp) => {
    const id = req.params.id;
    console.log(req.params.id);
    mongo.findById(id, (post) => {
        console.log(post);
        resp.render("post", {
            title: "Post",
            post: post.find(() => true)
        });
    });
});

module.exports = router;