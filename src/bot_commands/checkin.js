// For /checkInNow command
let date = require("date-and-time");

function checkInCommand(bot) {
  bot.command("check_in_now", (ctx) => {
    let timeNow = new Date();
    let timeNowString = date.format(timeNow, "ddd hh:mm A");

    ctx.reply(`Hello ${ctx.from.first_name}, you checked in at ${timeNowString}!`);
  });
}

module.exports = {
  checkInCommand: checkInCommand
};
