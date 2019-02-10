const mongoose = require("mongoose");
const moment = require("moment");
const { getDateString } = require("../date");

const currentCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date
});

const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);

function logCheckIn(ctx) {
  const currentTimeStamp = moment();
  currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
    if (docs != null) {
      console.log("i see you have checked in");
      ctx.reply(`Your previous check-in timestamp is ${getDateString(docs.checkInTimeStamp)}`);
      console.log(docs);
    } else {
      console.log("i see you have not checked in");
      const newRequestLog = new currentCheckInLog({
        telegramID: ctx.from.id,
        checkInTimeStamp: currentTimeStamp
      });

      newRequestLog.save(function(err) {
        if (!err) {
          console.log("successfully logged to DB");
          ctx.reply(`Your check-in timestamp is ${getDateString(currentTimeStamp)}`);
        } else {
          console.log(err);
        }
      });
    }
  });
}

module.exports = {
  logCheckIn: logCheckIn,
};
