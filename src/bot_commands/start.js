// For /start command
const { logCheckIn } = require("../components/database/current-check-in");

function startCommand(bot) {
  bot.start((ctx) => {
    ctx.reply(
      `Hello! I am the habit tracker bot! To view the list of commands, please type /help`
    );
  });
}

module.exports = {
  startCommand: startCommand
};
