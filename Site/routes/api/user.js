const express = require("express");
const route = express.Router();

const { passport } = require("./../../passport");

const checkUserLogin = (req, res, next) => {
    if(!req.user)
    {
        res.redirect("/login.html");
        return;
    }
    next();
}

route.get("/", checkUserLogin, (req, res, next) => {
    next();
});

route.use("/", express.static(__dirname + "/../../private/user"));

route.post("/login", passport.authenticate("user", {
    successRedirect: "/user",
    failureRedirect: "/login.html"
}));


route.get("/home", (req, res) => {
    console.log("User Just Logged In");
    res.sendStatus(200);
});

route.get("/", (req, res) => {
    if(req.message)
        res.send(req.message);
    else
      res.sendStatus(400);
})


module.exports = {
    route 
}