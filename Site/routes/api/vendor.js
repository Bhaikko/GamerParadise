const express = require("express");
const multer = require("multer");

const route = express.Router();
const upload = multer({ dest: __dirname + "/../../uploads/"});

const { passport } = require("./../../passport");
const vendorDatabaseHandler = require("./../../database/vendorDatabaseHandler");

const checkVendorLogin = (req, res, next) => {
    if(!req.user || !req.user.get().companyName)
    {
        res.redirect("/login.html");
        return;
    }
    next();
}

route.post("/signup", (req, res, next) => {
    vendorDatabaseHandler.addVendor(req.body.companyName, req.body.companyAddress, req.body.companyMobile, req.body.companyEmail, req.body.password);
    res.redirect("/login.html");
});

route.post("/login", passport.authenticate("vendor", {
    successRedirect: "/vendor",
    failureRedirect: "/login.html"
}));


route.post("/addProduct", upload.single("itemPhoto"), (req, res, next) => {

    vendorDatabaseHandler.addProduct(req.body.itemName, req.body.itemPrice, req.body.productType, req.body.productSubtype, req.file.filename, req.body.genre, req.user.id);
    res.redirect("/vendor");
});

route.get("/products", (req, res, next) => {
    vendorDatabaseHandler.getProducts(req.user.get().id)
     .then(products => res.send(products));
});

route.delete("/deleteProduct", (req, res, next) => {
    vendorDatabaseHandler.deleteProduct(req.user.get().id, req.body.id);
    res.sendStatus(200);
})

route.use(checkVendorLogin, (req, res, next) => {
    next();
});

route.use(express.static(__dirname + "/../../private/vendor"));

module.exports = {
    route 
}