//Creates mongoose model for history of all check-ins
const mongoose = require("mongoose");

const cheatDaySchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  cheatDayTimeStamp: Date
});

const cheatDayLog = mongoose.model("CheatDayLog", cheatDaySchema);

async function saveCheatDay(telegramID, cheatDayTimeStamp) {
  const newCheatDayLog = new cheatDayLog({
    telegramID: telegramID,
    cheatDayTimeStamp: cheatDayTimeStamp
  });

  return newCheatDayLog.save();
}

module.exports = {
  cheatDayLog: cheatDayLog,
  saveCheatDay: saveCheatDay
};
