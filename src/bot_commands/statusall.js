const { userLog } = require("../components/database/users");
const { currentCheckInLog } = require("../components/database/current-check-in");
const { historyCheckInLog } = require("../components/database/history-check-in");
const { getDateString, convertDateToSGT } = require("../components/date");
const moment = require("moment");

async function statusAllCommand(bot) {
  bot.command(["status_all", "status_all@janet_habit_bot"], (ctx) => {
    userLog.find(function(err, docs) {
      ctx.reply("dummy");
      docs.forEach(async function(user) {
        const statusString = await checkInStatus(user.telegramID);
        ctx.reply(`${user.name}: ${statusString}`);
      });
    });
  });
}

async function checkInStatus(telegramID) {
  const userInCurrentCheckInLog = await currentCheckInLog.find({ telegramID: telegramID });
  if (userInCurrentCheckInLog.length !== 0) {
    const previousCheckIn = getDateString(userInCurrentCheckInLog[0].checkInTimeStamp); // Formats check-in timestamp to a string.
    return `Currently checked in with the timestamp: ${previousCheckIn}`;
  }
  const userInHistoryCheckInLog = await historyCheckInLog.find({ telegramID: telegramID });
  let day = moment.tz("Asia/Singapore").date();
  let month = moment.tz("Asia/Singapore").month();
  let year = moment.tz("Asia/Singapore").year();
  let todayCheckInEntry = null;
  userInHistoryCheckInLog.forEach((checkIn) => {
    let checkInDate = convertDateToSGT(checkIn.checkInTimeStamp);
    if (day === checkInDate.date() && month === checkInDate.month() && year === checkInDate.year()) {
      todayCheckInEntry = checkIn;
    }
  });

  if (todayCheckInEntry !== null) {
    return `Has already checked in today with the timestamp: ${getDateString(todayCheckInEntry.checkInTimeStamp)}`;
  } else {
    return `Has not checked in today :(`;
  }
}
module.exports = {
  statusAllCommand: statusAllCommand
};
