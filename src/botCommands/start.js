// For /start command
function startCommand(bot) {
  bot.start((ctx) => {
    ctx.reply(
      `Hello! I am the habit tracker bot! To view a list of commands, please type /help`
    );
  });
}

module.exports = {
  startCommand: startCommand
}