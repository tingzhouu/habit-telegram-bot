const bot = require("./src/bot").bot;
const expressApp = require("./src/express").expressApp;

bot.launch();

expressApp.use(bot.webhookCallback("/"));
bot.telegram.setWebhook("https://janet-habit-bot.now.sh/");