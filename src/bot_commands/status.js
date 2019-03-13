const { currentCheckInLog, processCheckIn } = require("../components/database/current-check-in");
const { historyCheckInLog, processCheckOut } = require("../components/database/history-check-in");
const { getDateString, convertDateToSGT } = require("../components/date");
const moment = require("moment-timezone");

function statusCommand(bot) {
  bot.command(["status", "status@janet_habit_bot"], (ctx) => {
    //check if user has checked in for the day
    currentCheckInLog.find({ telegramID: ctx.from.id }, function(err, docs) {
      if (docs.length !== 0) {
        ctx.reply("dummy");
        const previousCheckIn = getDateString(docs[0].checkInTimeStamp); // Formats check-in timestamp to a string.
        ctx.reply(`Hey ${ctx.from.first_name}, you are currently checked in with the timestamp: ${previousCheckIn}`);
      } else {
        historyCheckInLog.find({ telegramID: ctx.from.id }, function(err, docs) {
          let day = moment.tz("Asia/Singapore").date();
          let month = moment.tz("Asia/Singapore").month();
          let year = moment.tz("Asia/Singapore").year();

          let todayCheckInEntry = null;
          console.log(todayCheckInEntry === null);
          docs.forEach((checkIn) => {
            let checkInDate = convertDateToSGT(checkIn.checkInTimeStamp);
            if (day === checkInDate.date() && month === checkInDate.month() && year === checkInDate.year()) {
              todayCheckInEntry = checkIn;
            }
          });

          if (todayCheckInEntry !== null) {
            ctx.reply("dummy");
            ctx.reply(
              `Hey ${ctx.from.first_name}, you have already checked in today with the timestamp: ${getDateString(
                todayCheckInEntry.checkInTimeStamp
              )}\nGreat job!`
            );
          } else {
            ctx.reply("dummy");
            ctx.reply(`Hey ${ctx.from.first_name}, you have not checked in today :(`);
          }
        });
      }
    });
  });
}

module.exports = {
  statusCommand: statusCommand
};
