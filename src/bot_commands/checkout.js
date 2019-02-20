// For /check_out_now command
const { getDateString } = require("./../components/date");
const moment = require("moment");
const { currentCheckInLog, deleteFromCurrentCheckInLog } = require("../components/database/current-check-in");
const { historyCheckInLog, processCheckOut } = require("../components/database/history-check-in");

function checkOutCommand(bot) {
  
  // This function will run when command /check_out_now is sent to the bot.
  bot.command(["check_out_now", "check_out_now@janet_habit_bot"], (ctx) => { 
    const currentTimeStamp = moment(); // Captures current time-stamp using Moment JS library.
    
    // Searches current check-ins to see if the user is already checked in.
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
      if (docs != null) { // If user is checked in already.
        console.log(
          `User has checked in previously at ${getDateString(docs.checkInTimeStamp)}` 
        );

        processCheckOut(docs.telegramID, docs.checkInTimeStamp, currentTimeStamp).then(successfulRequest => {
          if (successfulRequest) {
            console.log("successfully logged to DB");
            deleteFromCurrentCheckInLog(docs.telegramID).then(successfulDeletion => {
              if (successfulDeletion) {
                console.log("Successfully removed from current check-in log");
                ctx.reply("dummy");
                ctx.reply(`Your check-out timestamp is: ${getDateString(currentTimeStamp)}`);
              } else {
                console.log("Unsuccessful deletion");
              }
            });
          } else {
            console.log("failed to log to DB");
          }
        });

      } else { // If user is not checked in.
        console.log("User has not checked in yet");
        ctx.reply("dummy");
        ctx.reply( // Sends message to user to ask if user wants to check-in instead.
          `You have not checked in.\nDo you want to /check_in_now instead?`
        ); 
      }
    });
  });
}

module.exports = {
  checkOutCommand: checkOutCommand
};
