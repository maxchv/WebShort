const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/", (req, resp) => {
    resp.render("login", {
        title: "Login",
        notNavbar: true,
        notSidebar: true,
        notFooter: true
    })
});
router.post('/',
    passport.authenticate('local', {
        // successRedirect: '/admin',
        successReturnToOrRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        session: true
    })
);

module.exports = router;