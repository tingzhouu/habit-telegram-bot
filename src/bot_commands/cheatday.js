// For /cheatDay command
const { cheatDayLog, saveCheatDay } = require("./../components/database/cheat-day");
const moment = require("moment-timezone");
const { getDateString, convertDateToSGT } = require("./../components/date");

function cheatDayCommand(bot) {
  bot.command(["]cheat_day", "cheat_day@janet_habit_bot"], (ctx) => {
    const currentTimeStamp = moment(); // logs the current time stamp

    // searches for all cheat days used by user.
    cheatDayLog.find({ telegramID: ctx.from.id }, function(err, docs) {
      console.log(docs);
      if (docs == null || docs.length == 0) { //if there are no entries for the user.
        // save the cheat day in database.
        console.log("hi");
        saveCheatDay(ctx.from.id, currentTimeStamp).then(function(successfulRequest) {
          if (successfulRequest) {
            console.log("successfully logged to DB");
            ctx.reply("dummy");
            ctx.reply("You have consumed your cheat day for the month!");
          } else {
            console.log("failed to log to db");
          }
        });
      } else {
        // filters the entries of the user for those that were logged in the current month.
        const cheatDayLogWithCurrentMonth = docs.filter(function(cheatDayLog) {
          timeStampinSGTime = convertDateToSGT(cheatDayLog.cheatDayTimeStamp);
          return (timeStampinSGTime.month() === currentTimeStamp.month())
        }); 

        // if there are any cheat days in the month, reply with an error message.
        if (cheatDayLogWithCurrentMonth.length !== 0) {
          const previousCheatDayTimeStamp = convertDateToSGT(cheatDayLogWithCurrentMonth[0].cheatDayTimeStamp);
          ctx.reply("dummy");
          ctx.reply(`Your cheat day for the month was used on: ${ getDateString(previousCheatDayTimeStamp) }\n\nWait till next month!`);
        }
      }
    });
  });
}

module.exports = {
  cheatDayCommand: cheatDayCommand
};