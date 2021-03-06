const { currentCheckInLog, processCheckIn } = require("../components/database/current-check-in");
const { getDateString } = require("./../components/date");

function checkIn(telegramID) {
  currentCheckInLog.findOne({ telegramID }, function(err, docs) {
    if (docs != null) {
      // If user is checked in.
      const previousCheckIn = getDateString(docs.checkInTimeStamp); // Formats check-in timestamp to a string.
      console.log(`User checked in previously at ${previousCheckIn}`);
      ctx.reply("dummy");
      ctx.reply(
        // Sends message to user to ask if user wants to check-out instead.
        `Your previous check-in timestamp is: ${previousCheckIn}\nDo you want to /check_out_now instead?`
      );
    } else {
      console.log("User is not checked in");
      processCheckIn(ctx, currentTimeStamp).then((successfulRequest) => {
        if (successfulRequest) {
          console.log("logged to db");
          ctx.reply("dummy");
          ctx.reply(
            // Sends message to user with check-in time stamp
            `Your check-in timestamp is: ${getDateString(currentTimeStamp)}`
          );
        } else {
          console.log("failed to log to db");
        }
      });
    }
  });
}

module.exports = {
  checkIn
};
