const mongoose = require("mongoose");
require('dotenv').config();

function connectToDB() {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true`,
    { useNewUrlParser: true }
  ).then(function() {
    console.log(`User is ${process.env.DB_USER}`)
    console.log("Connected to DB");
  })
  .catch(function(err) {
    console.log(`Failed to connect to DB with user ${process.env.DB_USER}`);
    console.log(err);
  });
}

module.exports = {
  connectToDB: connectToDB
}