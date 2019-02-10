const mongoose = require("mongoose");
require('dotenv').config();

function connectToDB() {
  mongoose.connect(
    `mongodb+srv://:@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true`,
    { useNewUrlParser: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD
    }
  ).then(function() {
    console.log(`Connected to DB with user: ${process.env.DB_USER}`);
  })
  .catch(function(err) {
    console.log(`Failed to connect to DB with user: ${process.env.DB_USER}`);
    console.log(err);
  });
}

module.exports = {
  connectToDB: connectToDB
}