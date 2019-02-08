// For /help command
function helpCommand(bot) {
  bot.command("help", (ctx) => {
    ctx.reply(
      `Below are the list of functions available:\n
/start - Let Janet introduce herself
/help - List available commands
/check_in_now - Check in with current timestamp
/check_out_now - Check out with current timestamp
/cheat_day - Consume your cheat day for the month`
    );
  });
}

module.exports = {
  helpCommand: helpCommand
}