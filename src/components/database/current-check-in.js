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
  const previousCheckInDetails = checkCheckedInUser(ctx);
  console.log("start of previous check in details");
  console.log(previousCheckInDetails);
  console.log("end of previous check in details");

  if (previousCheckInDetails) {
    ctx.reply(`Your previous check-in timestamp is ${getDateString(previousCheckInDetails.checkInTimeStamp)}`);
  } else {
    const newRequestLog = new currentCheckInLog({
      telegramID: ctx.from.id,
      checkInTimeStamp: moment()
    });
  
    newRequestLog.save(function(err) {
      if (!err) {
        console.log("successfully logged to DB");
      } else {
        console.log(err);
      }
    });
  }
}

function checkCheckedInUser(ctx) {
  currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
    if (docs != null) {
      console.log("i see you have checked in");
      console.log(docs);
      return docs;
    } else {
      console.log("i see you have not checked in");
      console.log(err);
      return null;
    }
  });
}

module.exports = {
  logCheckIn: logCheckIn,
  checkCheckedInUser: checkCheckedInUser
};
