//Create express server to route requests from Telegram API
const express = require("express");
const expressApp = express();

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(3000, () => {
  console.log("Telegram bot listening on port 3000!");
});

module.exports = {
  expressApp: expressApp
}