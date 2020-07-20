const express = require("express");
const path = require("path")
const multer = require("multer");
const mongo = require("../db/mongo");
const passport = require("passport");
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    }
    next();
});

router.get("/", (req, resp) => {
    resp.render("admin", {
        title: "Admin panel"
    })
});

router.post("/", multer({
    storage: storage
}).single("image"), (req, resp, next) => {
    const post = {
        title: req.body.title,
        published: new Date(),
        intro: req.body.intro,
        image: req.file.originalname,
        link: req.body.link,
        message: req.body.message,
        author: req.user ? req.user.username : 'noname'
    };
    mongo.addPost(post, (err, result) => {
        if (err) return resp.send(err);
        resp.redirect("/post/" + result.insertedId);
    })
});

module.exports = router;