// For /checkOutNow command
let date = require("date-and-time");

function checkOutCommand(bot) {
  let timeNow = new Date();
  let timeNowString = date.format(timeNow, "ddd hh:mm A");

  bot.command("check_out_now", (ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}, you checked out at ${timeNowString}!`);
  });
}

module.exports = {
  checkOutCommand: checkOutCommand
};
