const express = require("express");

const server = express();

const PORT = 4000;
server.listen(PORT, () => console.log("Server Up And Running On 127.0.01:" + PORT));
