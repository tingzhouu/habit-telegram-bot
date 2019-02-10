const { bot } = require("./src/bot");
const express = require("express");
const expressApp = express();
const { connectToDB } = require("./src/components/database/database");

const URL = process.env.URL || "https://janet-habit-bot.herokuapp.com/";
const PORT = process.env.PORT || 3000;

expressApp.get("/", function(req, res) {
  res.send("hi");
});

connectToDB();

/*
expressApp.use(bot.webhookCallback("/"));

bot.telegram
  .setWebhook(URL)
  .then(function() {
    console.log("Telegram bot setWebhook ok!");
  })
  .catch(function(error) {
    console.log("Telegram bot setWebhook failed!");
    console.log(error);
  });
*/

bot.launch()

expressApp.listen(PORT, () => {
  console.log(`Telegram bot listening on port ${PORT}!`);;
});
