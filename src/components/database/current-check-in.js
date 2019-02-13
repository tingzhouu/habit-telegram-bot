//Creates mongoose model for history of users who are currently checked-in
const mongoose = require("mongoose");

const currentCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date
});

const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);

async function processCheckIn(ctx, currentTimeStamp) {
  const newRequestLog = new currentCheckInLog({
    // Creates a new document to write to MongoDB that logs the user's telegram ID, check-in timestamp to checkinlogs.
    telegramID: ctx.from.id,
    checkInTimeStamp: currentTimeStamp
  });

  return newRequestLog.save();
}

async function deleteFromCurrentCheckInLog(telegramID) {
  return currentCheckInLog.deleteMany({telegramID: telegramID});
}

module.exports = {
  currentCheckInLog: currentCheckInLog,
  processCheckIn: processCheckIn,
  deleteFromCurrentCheckInLog: deleteFromCurrentCheckInLog
};
