const express = require("express");
const multer = require("multer");

const route = express.Router();
const upload = multer({ dest: __dirname + "/../../uploads/"});

const { passport } = require("./../../passport");
const vendorDatabaseHandler = require("./../../database/vendorDatabaseHandler");

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
});

route.post("/addProduct", upload.single("itemPhoto"), (req, res, next) => {

    vendorDatabaseHandler.addProduct(req.body.itemName, req.body.itemPrice, req.body.productType, req.body.productSubtype, req.file.filename, req.body.genre, req.user.id);
    res.redirect("/vendor");
});



module.exports = {
    route 
}