// Create bot with commands
require('dotenv').config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

const { startCommand } = require("./bot_commands/start");
const { checkInCommand } = require("./bot_commands/checkin");
const { checkOutCommand } = require("./bot_commands/checkout");
const { helpCommand } = require("./bot_commands/help");
const { cheatDayCommand } = require("./bot_commands/cheatday");

startCommand(bot);
checkInCommand(bot);
checkOutCommand(bot);
helpCommand(bot);
cheatDayCommand(bot);

module.exports = {
  bot: bot
};
