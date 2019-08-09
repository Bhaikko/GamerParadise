const route = require("express").Router();

const { passport } = require("./../../passport");

const checkUserLogin = () => {
    if(!req.user)
    {
        res.redirect("/user/login.html");
        return;
    }
    next();


}
route.get("/", checkUserLogin, (req, res) => {
    // console.log()
});

route.post("/login", passport.authenticate("user", {
    successRedirect: "/user/home",
    failureRedirect: "/user"
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