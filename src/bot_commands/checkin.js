// For /checkInNow command
function checkInCommand(bot) {
  bot.command("checkInNow", (ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}, you are now checked in!`);
  });
}

module.exports = {
  checkInCommand: checkInCommand
};
