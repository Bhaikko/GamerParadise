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
    userdatabaseHandler.getProductsSearch(name)
     .then(products => res.send(products));
});

route.get("/getProductsFiltered", (req, res) => {
    userdatabaseHandler.getProductsFiltered(req.query.productType || "", req.query.productSubtype || "", req.query.genre || [], req.query.maxPrice || "999999999", req.query.minPrice || "0")
     .then(products => res.send(products));
    
});

route.get("/product/:id", (req, res) => {
    res.redirect("/user/product.html?id=" + req.params.id);
})

route.get("/getProductDetails/:id", (req, res) => {
    userdatabaseHandler.getProductDetails(req.params.id)
     .then(products => res.send(products));
})

route.post("/addReview", (req, res) => {
    userdatabaseHandler.addReview(req.body.reviewText, req.body.reviewStars, req.body.productId, req.user.id)
    res.redirect("/user/product.html?id=" + req.body.productId);
})

route.post("/addCartItem", (req, res) => {
    userdatabaseHandler.addCartItem(req.user.id, req.body.productId)
     .then(status => res.send(status));
});

route.get("/getCartItems", (req, res) => {
    userdatabaseHandler.getCartItems(req.user.id)
     .then(cartItems => res.send(cartItems));
})

route.delete("/deleteCartItem", (req, res) => {
    userdatabaseHandler.deleteCartItem(req.body.productId, req.user.id);
    res.sendStatus(200);
})

route.patch("/updateQuantity", (req, res) => {
    userdatabaseHandler.updateQuantity(req.body.productId, req.user.id, req.body.quantity);
    res.sendStatus(200);
})

module.exports = {
    route 
}