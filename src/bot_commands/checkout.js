// For /checkOutNow command
const { getDateString } = require("./../components/date");
const moment = require("moment");

function checkOutCommand(bot) {
  bot.command("check_out_now", (ctx) => {
    const date = moment();
    ctx.reply(
      `Hello ${ctx.from.first_name}, your check-out timestamp is ${getDateString(date)}!`
    );
  });
}

module.exports = {
  checkOutCommand: checkOutCommand
};
