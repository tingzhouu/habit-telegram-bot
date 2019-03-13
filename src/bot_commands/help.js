// For /help command
function helpCommand(bot) {
  bot.command(["help", "help@janet_habit_bot"], (ctx) => {
    ctx.reply(
      `Below are the list of functions available:\n
/start - Let Janet introduce herself
/help - List available commands
/check_in_now - Check in with current timestamp
/check_out_now - Check out with current timestamp
/check_in_manual - Check in at a certain time (DD/MM/YY HH:mm). eg /check_in_manual 22/04/19 16:48
/check_out_manual - Check out at a certain time (DD/MM/YY HH:mm). eg /check_out_manual 22/04/19 18:23
/cheat_day - Consume your cheat day for the month
/status - Check if you have checked in for today
/status_all - Check everyone's status!`
    );
  });
}

module.exports = {
  helpCommand: helpCommand
};
