// For /check_out_now command
const { getDateString } = require("./../components/date");
const moment = require("moment");
const { currentCheckInLog } = require("../components/database/current-check-in");
const { historyCheckInLog } = require("../components/database/history-check-in");

function checkOutCommand(bot) {
  bot.command("check_out_now", (ctx) => { // This function will run when command /check_out_now is sent to the bot.
    const currentTimeStamp = moment(); // Captures current time-stamp using Moment JS library.
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) { // Searches current check-ins to see if the user is already checked in.
      if (docs != null) { // If user is checked in already.
        console.log(
          `User has checked in previously at ${getDateString(docs.checkInTimeStamp)}` 
        );

        const newHistoryLog = new historyCheckInLog({ // Creates a new document to write to MongoDB that logs the user's telegram ID, check-in timestamp, check-out timestamp to checkinhistorylogs.
          telegramID: docs.telegramID,
          checkInTimeStamp: docs.checkInTimeStamp,
          checkOutTimeStamp: currentTimeStamp
        });

        newHistoryLog.save(function(err) { // Writes the document to MongoDB.
          if (!err) { // If writing to MongoDB is successful.
            console.log("successfully logged to DB");

            currentCheckInLog.deleteMany( // Removes user from currentcheckinlogs. Uses deleteMany to capture corner case of duplicate entries.
              { telegramID: docs.telegramID },
              function (err) {
                if (!err) { // If deletion from MongoDB is successful.
                  console.log("Successfully removed from current check-in log");
                } else {
                  console.log(err);
                }
              }
            );

            ctx.reply( // Sends message to user with check-out timestamp.
              `Your check-out timestamp is: ${getDateString(currentTimeStamp)}`
            );
          } else { // If writing to MongoDB is unsuccessful.
            console.log(err);
          }
        });
      } else { // If user is not checked in.
        console.log("User has not checked in yet");
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
