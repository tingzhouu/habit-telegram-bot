//Creates mongoose model for history of all check-ins
const mongoose = require("mongoose");

const historyCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date,
  activityCompleted: String
});

const historyCheckInLog = mongoose.model(
  "CheckInHistoryLog",
  historyCheckInSchema
);

async function processCheckOut(telegramID, checkInTimeStamp, checkOutTimeStamp) {
  const historyRequestLog = new historyCheckInLog({
    // Creates a new document to write to MongoDB that logs the user's telegram ID, check-in timestamp to historycheckinlogs.
    telegramID: telegramID,
    checkInTimeStamp: checkInTimeStamp,
    checkOutTimeStamp: checkOutTimeStamp
  });

  return historyRequestLog.save();
}

module.exports = {
  historyCheckInLog: historyCheckInLog,
  processCheckOut: processCheckOut
};
