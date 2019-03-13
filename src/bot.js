// Create bot with commands
require("dotenv").config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

const { startCommand } = require("./bot_commands/start");
const { checkInCommand } = require("./bot_commands/checkin");
const { checkOutCommand } = require("./bot_commands/checkout");
const { helpCommand } = require("./bot_commands/help");
const { cheatDayCommand } = require("./bot_commands/cheatday");
const { checkInManualCommand } = require("./bot_commands/checkinmanual");
const { checkOutManualCommand } = require("./bot_commands/checkoutmanual");
const { statusCommand } = require("./bot_commands/status");
const { statusAllCommand } = require("./bot_commands/statusall");

startCommand(bot);
checkInCommand(bot);
checkOutCommand(bot);
helpCommand(bot);
cheatDayCommand(bot);
checkInManualCommand(bot);
checkOutManualCommand(bot);
statusCommand(bot);
statusAllCommand(bot);

module.exports = {
  bot: bot
};
