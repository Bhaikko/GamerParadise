const express = require("express");
const session = require("express-session");

const userRouter = require("./routes/api/user").route;
const vendorRouter = require("./routes/api/vendor").route;
const { passport } = require("./passport");

const { database } = require("./database/database");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

const sessionMiddleware = session({
    secret: "FFFFF",
    resave: false,
    saveUninitialized: true 
});

server.use(sessionMiddleware);
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static("./uploads"));
server.use(express.static("./public"));

server.use("/user", userRouter);
server.use("/vendor", vendorRouter);


server.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});



const PORT = 4000;
database.sync()
    .then(() => {
        console.log("SQL Database Synced");
        server.listen(PORT, () => console.log("Server Up And Running On 127.0.0.1:" + PORT));
    });

