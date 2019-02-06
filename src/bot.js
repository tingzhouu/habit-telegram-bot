// Create bot with commands
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const startCommand = require("./bot_commands/start").startCommand;
const checkInCommand = require("./bot_commands/checkin").checkInCommand;
const checkOutCommand = require("./bot_commands/checkout").checkOutCommand;
const helpCommand = require("./bot_commands/help").helpCommand;
const cheatDayCommand = require("./bot_commands/cheatday").cheatDayCommand;

startCommand(bot);
checkInCommand(bot);
checkOutCommand(bot);
helpCommand(bot);
cheatDayCommand(bot);

module.exports = {
  bot: bot
};
