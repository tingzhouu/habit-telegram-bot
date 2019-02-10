const mongoose = require("mongoose");
require('dotenv').config();

function connectToDB() {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true`,
    { useNewUrlParser: true }
  );
}

module.exports = {
  connectToDB: connectToDB
}