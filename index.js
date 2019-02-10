const { bot } = require("./src/bot");
const express = require("express");
const expressApp = express();
const { connectToDB } = require("./src/components/database/database");

const URL = process.env.URL || "https://janet-habit-bot.herokuapp.com/";
const PORT = process.env.PORT || 3000;

expressApp.get("/", function(req, res) { // To test if the website is up
  res.send("hi");
});

connectToDB(); // Connect to MongoDB database

expressApp.use(bot.webhookCallback("/"));

bot.telegram // Set webhook for telegram bot to herokuapp url
  .setWebhook(URL)
  .then(function() {
    console.log("Telegram bot setWebhook ok!");
  })
  .catch(function(error) {
    console.log("Telegram bot setWebhook failed!");
    console.log(error);
  });

expressApp.listen(PORT, () => {
  console.log(`Telegram bot listening on port ${PORT}!`);;
});
