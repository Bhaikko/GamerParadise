const express = require("express");

const { database } = require("./database/database");

const server = express();

const PORT = 4000;

database.sync()
    .then(() => {
        console.log("SQL Database Synced");
        server.listen(PORT, () => console.log("Server Up And Running On 127.0.01:" + PORT));
    });

