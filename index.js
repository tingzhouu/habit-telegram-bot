const { bot } = require("./src/bot");
const express = require("express");
const expressApp = express();
const mongoose = require("mongoose");

expressApp.get("/", function(req, res) {
  res.send("hi");
});

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGO_USER}:${
//     process.env.MONGO_PASSWORD
//   }@cluster0-71gbh.mongodb.net/habitbotDB?retryWrites=true`,
//   { useNewUrlParser: true },
//   function(error) {
//     console.log("failed to connect to DB");
//     console.log(error);
//   }
// );

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
