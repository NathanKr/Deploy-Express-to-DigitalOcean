console.log("app is loading");

const express = require("express");
const app = express();
const routeHelper = require("./routeHelper");
const utils = require("./production_utils");

// used for json inside body
app.use(express.json());

app.post("/users/register", (req, res) => {
  routeHelper.register(req, res);
});

app.post("/users/login", (req, res) => {
  routeHelper.login(req, res);
});

// --- must be last before listen because it handle non served route
utils.handleProduction(express, app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
