const { getDateString } = require("../components/date");
const moment = require("moment");
const { currentCheckInLog, deleteFromCurrentCheckInLog } = require("../components/database/current-check-in");
const { historyCheckInLog, processCheckOut } = require("../components/database/history-check-in");

function checkOutManualCommand(bot) {
  bot.command(["check_out_manual", "check_out_manual@janet_habit_bot"], (ctx) => {
    const isValidMessage = checkValidMessage(ctx);
    if (!isValidMessage) {
      errorMessage(ctx);
      return;
    }

    const manualTimeStamp = getManualTimeStamp(ctx);

    // Searches current check-ins to see if the user is already checked in.
    currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
      if (docs != null) {
        // If user is checked in already.
        console.log(`User has checked in previously at ${getDateString(docs.checkInTimeStamp)}`);

        processCheckOut(docs.telegramID, docs.checkInTimeStamp, manualTimeStamp).then((successfulRequest) => {
          if (successfulRequest) {
            console.log("successfully logged to DB");
            deleteFromCurrentCheckInLog(docs.telegramID).then((successfulDeletion) => {
              if (successfulDeletion) {
                console.log("Successfully removed from current check-in log");
                ctx.reply("dummy");
                ctx.reply(`Your check-out timestamp is: ${getDateString(manualTimeStamp)}`);
              } else {
                console.log("Unsuccessful deletion");
              }
            });
          } else {
            console.log("failed to log to DB");
          }
        });
      } else {
        // If user is not checked in.
        console.log("User has not checked in yet");
        ctx.reply("dummy");
        ctx.reply(
          // Sends message to user to ask if user wants to check-in instead.
          `You have not checked in.\nDo you want to /check_in_now instead?`
        );
      }
    });
  });
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

function errorMessage(ctx) {
  ctx.reply(
    "For manual check-out, please use the following format with 24HR time: /check_out_manual DD/MM/YY HH:MM.\n\nExample: /check_out_manual 22/04/19 18:23 will create a timestamp for 22 April 2019, 1823hrs"
  );
}
module.exports = {
  checkOutManualCommand: checkOutManualCommand
};
