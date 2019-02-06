// Create bot with commands
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const startCommand = require("./botCommands/start").startCommand;
const checkInCommand = require("./botCommands/checkin").checkInCommand;
const checkOutCommand = require("./botCommands/checkout").checkOutCommand;
const helpCommand = require("./botCommands/help").helpCommand;
const cheatDayCommand = require("./botCommands/cheatday").cheatDayCommand;

startCommand(bot);
checkInCommand(bot);
checkOutCommand(bot);
helpCommand(bot);
cheatDayCommand(bot);

module.exports = {
  bot: bot
};
