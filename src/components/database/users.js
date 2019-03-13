const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  name: String
});

const userLog = mongoose.model("UserLog", userSchema);

module.exports = {
  userLog: userLog
};
