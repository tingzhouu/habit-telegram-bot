// For /checkInNow command
const moment = require("moment");
const { currentCheckInLog } = require("../components/database/current-check-in");
const { getDateString } = require("../components/date");

function checkInCommand(bot) {
  bot.command("check_in_now", (ctx) => {
    const currentTimeStamp = moment();
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
      if (docs != null) {
        const previousCheckIn = getDateString(docs.checkInTimeStamp);
        console.log(`i see you have checked in previously at ${previousCheckIn}`);
        ctx.reply("");
        ctx.reply(
          `Your previous check-in timestamp is: ${ previousCheckIn }\nDo you want to /check_out_now instead?`
        );
      } else {
        console.log("i see you have not checked in");
        const newRequestLog = new currentCheckInLog({
          telegramID: ctx.from.id,
          checkInTimeStamp: currentTimeStamp
        });

        newRequestLog.save(function(err) {
          if (!err) {
            console.log("successfully logged to DB");
            ctx.reply(
              `Your check-in timestamp is: ${getDateString(currentTimeStamp)}`
            );
          } else {
            console.log(err);
          }
        });
      }
    });
  });
}

module.exports = {
  checkInCommand: checkInCommand
};
