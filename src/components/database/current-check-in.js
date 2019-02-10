//Creates mongoose model for history of users who are currently checked-in
const mongoose = require("mongoose");

const currentCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date
});

const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);

module.exports = {
  currentCheckInLog: currentCheckInLog
};
