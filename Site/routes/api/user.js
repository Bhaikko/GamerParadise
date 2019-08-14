const express = require("express");
const route = express.Router();

const { passport } = require("./../../passport");

const checkUserLogin = (req, res, next) => {
    if(!req.user || !req.user.get().name)
    {
        res.redirect("/login.html");
        return;
    }
    next();
}

route.post("/login", passport.authenticate("user", {
    successRedirect: "/user",
    failureRedirect: "/login.html"
}));

route.use(checkUserLogin, (req, res, next) => {
    next();
});

route.use(express.static(__dirname + "/../../private/user"));




module.exports = {
    route 
}