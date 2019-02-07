// For /cheatDay command
function cheatDayCommand(bot) {
  bot.command("cheat_day", (ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}, you have used your cheat day for the month!`);
  });
}

module.exports = {
  cheatDayCommand: cheatDayCommand
};