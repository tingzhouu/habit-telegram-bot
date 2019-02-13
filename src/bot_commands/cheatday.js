// For /cheatDay command
const { cheatDayLog } = require("./../components/database/cheat-day");
const moment = require("moment-timezone");
const { getDateString } = require("./../components/date");


function cheatDayCommand(bot) {
  bot.command("cheat_day", (ctx) => {
    const currentTimeStamp = moment();
    const newCheatDayLog = new cheatDayLog({
      telegramID: ctx.from.id,
      cheatDayTimeStamp: currentTimeStamp
    });


    cheatDayLog.find({telegramID: ctx.from.id}, function(err, docs) {
      if (docs == null) {
        newCheatDayLog.save(function(err) {
          if (!err) {
            console.log("successfully logged to DB");
            ctx.reply("dummy");
            ctx.reply("You have used your cheat day for the month!");
          } else {
            console.log(err);
          }
        });
      } else {
        const cheatDayLogWithCurrentMonth = docs.filter(function(cheatDayLog) {
          timeStampinSGTime = moment.tz(cheatDayLog.cheatDayTimeStamp, "Asia/Singapore");
          return (timeStampinSGTime.month() === currentTimeStamp.month())
        }); 
        if (cheatDayLogWithCurrentMonth.length === 0) {
          newCheatDayLog.save(function(err) {
            if (!err) {
              ctx.reply("dummy");
              ctx.reply("You have used your cheat day for the month!");
              console.log("successfully logged to DB");
            } else {
              console.log(err);
            }
          });
        } else {
          const previousCheatDayTimeStamp = moment.tz(cheatDayLogWithCurrentMonth[0].cheatDayTimeStamp, "Asia/Singapore");
          ctx.reply("dummy");
          ctx.reply(`Your cheat day for the month was used on: ${getDateString(previousCheatDayTimeStamp)}`);
        }
      }
    });


    

    
  });
}

module.exports = {
  cheatDayCommand: cheatDayCommand
};