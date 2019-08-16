const express = require("express");
const route = express.Router();

const { passport } = require("./../../passport");

const userdatabaseHandler = require("./../../database/userDatabaseHandler");

const checkUserLogin = (req, res, next) => {
    if(!req.user || !req.user.get().name)
    {
        res.redirect("/login.html");
        return;
    }
    next();
}

route.post("/signup", (req, res, next) => {
    userdatabaseHandler.addUser(req.body.name, req.body.address, req.body.email, req.body.mobile, req.body.password);
    res.redirect("/login.html");
})

route.post("/login", passport.authenticate("user", {
    successRedirect: "/user",
    failureRedirect: "/login.html"
}));

route.use(checkUserLogin, (req, res, next) => {
    next();
});

route.use(express.static(__dirname + "/../../private/user"));

route.get("/getProductsHomepage", (req, res, next) => {
    const productType = req.query.productType;
    userdatabaseHandler.getProductsHomepage(productType)
     .then(products => res.send(products));
});

route.get("/getProductsSearch", (req, res) => {
    const name = req.query.name;
    // console.log(name);
    userdatabaseHandler.getProductsSearch(name)
     .then(products => res.send(products));
});

route.get("/getProductsFiltered", (req, res) => {
    userdatabaseHandler.getProductsFiltered(req.query.productType || "", req.query.productSubtype || "", req.query.genre || [], req.query.maxPrice || "999999999", req.query.minPrice || "0")
     .then(products => res.send(products));
    
})


module.exports = {
    route 
}