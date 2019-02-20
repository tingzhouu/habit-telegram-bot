// For /help command
function helpCommand(bot) {
  bot.command(["help", "help@janet_habit_bot"], (ctx) => {
    ctx.reply(
      `Below are the list of functions available:\n
/start - Let Janet introduce herself
/help - List available commands
/check_in_now - Check in with current timestamp
/check_out_now - Check out with current timestamp
/check_in_manual - Check in at a certain time (DD/MM/YY HH:mm). eg /check_in_manual 28/11/19 16:48
/check_out_manual - Check out at a certain time (DD/MM/YY HH:mm). eg /check_out_manual 28/11/19 16:48
/cheat_day - Consume your cheat day for the month`
    );
  });
}

module.exports = {
  helpCommand: helpCommand
}