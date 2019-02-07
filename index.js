const { bot } = require("./src/bot");
const express = require("express");
const expressApp = express();

expressApp.use(bot.webhookCallback("/"));

bot.telegram
  .setWebhook("https://janet-habit-bot.now.sh")
  .then(function() {
    console.log("Telegram bot setWebhook ok!");
  })
  .catch(function(error) {
    console.log("Telegram bot setWebhook failed!");
    console.log(error);
  });

expressApp.listen(3000, () => {
  console.log("Telegram bot listening on port 3000!");
});
