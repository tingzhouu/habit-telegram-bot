//Creates mongoose model for history of all check-ins
const mongoose = require("mongoose");

const cheatDaySchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  cheatDayTimeStamp: Date
});

const cheatDayLog = mongoose.model("CheatDayLog", cheatDaySchema);

module.exports = {
  cheatDayLog: cheatDayLog
};