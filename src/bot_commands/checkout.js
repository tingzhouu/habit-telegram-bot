// For /checkOutNow command
const { getDateString } = require("./../components/date");
const moment = require("moment");
const { currentCheckInLog } = require("../components/database/current-check-in");
const { historyCheckInLog } = require("../components/database/history-check-in");

function checkOutCommand(bot) {
  bot.command("check_out_now", (ctx) => {
    const currentTimeStamp = moment();
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
      if (docs != null) {
        console.log(
          `i see you have checked in previously at ${getDateString(
            docs.checkInTimeStamp
          )}`
        );

        const newHistoryLog = new historyCheckInLog({
          telegramID: docs.telegramID,
          checkInTimeStamp: docs.checkInTimeStamp,
          checkOutTimeStamp: currentTimeStamp
        });

        newHistoryLog.save(function(err) {
          if (!err) {
            console.log("successfully logged to DB");

            currentCheckInLog.deleteMany(
              { telegramID: docs.telegramID },
              function(err) {
                if (!err) {
                  console.log("successfully removed from current check-in log");
                } else {
                  console.log(err);
                }
              }
            );

            ctx.reply("dummy message");
            ctx.reply(
              `Your check-out timestamp is: ${getDateString(currentTimeStamp)}`
            );
          } else {
            console.log(err);
          }
        });
      } else {
        console.log("i see you have not checked in");
        ctx.reply("dummy message");
        ctx.reply(
          `You have not checked in.\nDo you want to /check_in_now instead?`
        );
      }
    });
  });
}

module.exports = {
  checkOutCommand: checkOutCommand
};
