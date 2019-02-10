// For /start command
function startCommand(bot) {
  bot.start((ctx) => {
    ctx.reply(
      `Hello! My name is Janet :) I am a habit tracker bot! To view the list of commands, please type /help`
    );
  });
}

module.exports = {
  startCommand: startCommand
};
