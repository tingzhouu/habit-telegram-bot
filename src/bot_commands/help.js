// For /helpcommand
function helpCommand(bot) {
  bot.command("help", (ctx) => {
    ctx.reply(
      `Below are the list of functions available:\n
      /checkInNow - Check in with current timestamp
      /checkOutNow - Check out with current timestamp
      /cheatDay - Consume your cheat day for the month`
    );
  });
}

module.exports = {
  helpCommand: helpCommand
}