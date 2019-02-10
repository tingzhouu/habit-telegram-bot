const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { getDateString } = require("../date");

const currentCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date
});

const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);



module.exports = {
  currentCheckInLog: currentCheckInLog,
};
