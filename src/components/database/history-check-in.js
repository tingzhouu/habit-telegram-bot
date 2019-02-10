//Creates mongoose model for history of all check-ins
const mongoose = require("mongoose");

const historyCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date,
  activityCompleted: String
});

const historyCheckInLog = mongoose.model("CheckInHistoryLog", historyCheckInSchema);

module.exports = {
  historyCheckInLog: historyCheckInLog
};
