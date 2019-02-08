const mongoose = require("mongoose");
const moment = require("moment");
const { logCheckIn, checkCheckedInUser } = require("./current-check-in");

mongoose.connect(
  "mongodb+srv://admin-tingzhou:nasitomato@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true",
  { useNewUrlParser: true }
);

checkCheckedInUser({from: {id: 1234}});
