// For /checkInNow command
const { getDateString } = require("./../components/date");
const moment = require("moment");

function checkInCommand(bot) {
  bot.command("check_in_now", (ctx) => {
    const date = moment();
    ctx.reply(
      `Hello ${ctx.from.first_name}, your check-in timestamp is ${getDateString(date)}!`
    );
  });
}

module.exports = {
  checkInCommand: checkInCommand
};
