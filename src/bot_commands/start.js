// For /start command
const { logCheckIn } = require("../components/database/current-check-in");
const mongoose = require("mongoose");

function startCommand(bot) {
  bot.start((ctx) => {
    ctx.reply(
      `Hello! I am the habit tracker bot! To view a list of commands, please type /help ${mongoose.connection.readyState}`
    );
    logCheckIn(ctx);
  });
}

module.exports = {
  startCommand: startCommand
};
