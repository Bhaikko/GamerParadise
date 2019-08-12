const express = require("express");
const route = express.Router();

const { passport } = require("./../../passport");

const checkVendorLogin = (req, res, next) => {
    if(!req.user)
    {
        res.redirect("/login.html");
        return;
    }
    next();
}

route.get("/", checkVendorLogin, (req, res, next) => {
    next();
});

route.use("/", express.static(__dirname + "/../../private/vendor"));

route.post("/login", passport.authenticate("vendor", {
    successRedirect: "/vendor",
    failureRedirect: "/login.html"
}));


route.get("/", (req, res) => {
    if(req.message)
        res.send(req.message);
    else
      res.sendStatus(400);
})



module.exports = {
    route 
}