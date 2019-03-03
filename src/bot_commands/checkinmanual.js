const { getDateString } = require("../components/date");
const moment = require("moment");
const { currentCheckInLog, processCheckIn } = require("../components/database/current-check-in");

function checkInManualCommand(bot) {
  bot.command(["check_in_manual", "check_in_manual@janet_habit_bot"], (ctx) => {
    const isValidMessage = checkValidMessage(ctx);
    if (!isValidMessage) {
      errorMessage(ctx);
      return;
    }

    const manualTimeStamp = getManualTimeStamp(ctx);

    // check if user is checked in
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
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
        processCheckIn(ctx, manualTimeStamp).then((successfulRequest) => {
          if (successfulRequest) {
            console.log("logged to db");
            ctx.reply("dummy");
            ctx.reply(
              // Sends message to user with check-in time stamp
              `Your check-in timestamp is: ${getDateString(manualTimeStamp)}`
            );
          } else {
            console.log("failed to log to db");
          }
        });
      }
    });
  });
}

function errorMessage(ctx) {
  ctx.reply(
    'For manual check-in, please use the following format with 24HR time: /check_in_manual DD/MM/YY HH:MM.\n\nExample: "/check_in_manual 28/11/19 16:48" will create a timestamp for 28 November 2019, 1648hrs'
  );
}

function checkValidMessage(ctx) {
  const message = ctx.update.message.text.split(" ");

  if (message.length !== 3) {
    console.log(message);
    console.log("length wrong");
    return false;
  }

  if (!moment(message[1], "DD/MM/YY", true).isValid()) {
    console.log("date wrong");
    return false;
  }

  if (!moment(message[2], "HH:mm", true).isValid()) {
    console.log("time wrong");
    return false;
  }
  return true;
}

function getManualTimeStamp(ctx) {
  const message = ctx.update.message.text.split(" ");
  return moment.tz(`${message[1]} ${message[2]}`, "DD/MM/YY HH:mm", "Asia/Singapore");
}

module.exports = {
  checkInManualCommand: checkInManualCommand
};
