const bot = require("./src/bot").bot;
const expressApp = require("./src/express").expressApp;

bot.launch();

expressApp.use(bot.webhookCallback("/secret-path"));
bot.telegram.setWebhook("https://janet-habit-bot.now.sh/secret-path");