// For /checkInNow command
const moment = require("moment");
const { currentCheckInLog } = require("../components/database/current-check-in");
const { getDateString } = require("../components/date");

function checkInCommand(bot) {
  bot.command("check_in_now", (ctx) => { // This function will run when command /check_in_now is sent to the bot.
    const currentTimeStamp = moment(); // Captures current time-stamp using Moment JS library.
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) { // Searches current check-ins to see if the user is already checked in.
      
      if (docs != null) { // If user is checked in.
        const previousCheckIn = getDateString(docs.checkInTimeStamp); // Formats check-in timestamp to a string.
        console.log(`User checked in previously at ${previousCheckIn}`);
        ctx.reply( // Sends message to user to ask if user wants to check-out instead.
          `Your previous check-in timestamp is: ${ previousCheckIn }\nDo you want to /check_out_now instead?`
        );
      } else {
        console.log("User is not checked in");
        const newRequestLog = new currentCheckInLog({ // Creates a new document to write to MongoDB that logs the user's telegram ID, check-in timestamp to checkinlogs.
          telegramID: ctx.from.id,
          checkInTimeStamp: currentTimeStamp
        });

        newRequestLog.save(function(err) { // Writes the document to MongoDB.
          if (!err) { // If writing to MongoDB is successful.
            console.log("successfully logged to DB");
            ctx.reply( // Sends message to user with check-in time stamp
              `Your check-in timestamp is: ${getDateString(currentTimeStamp)}`
            );
          } else { // If writing to MongoDB is not successful.
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
