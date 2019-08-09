const route = require("express").Router();

const { passport } = require("./../../passport");

route.post("/login", passport.authenticate("vendor", {
    successRedirect: "/vendor/home",
    failureRedirect: "/vendor"
}));


route.get("/home", (req, res) => {
    console.log("Vendor Just Logged In");
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