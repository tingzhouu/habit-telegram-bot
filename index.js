const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = new express();
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(bodyParser.json());

const instance = axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API}`,
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to port ${process.env.PORT || 3000}`);
  }
);

app.post("/newMsg", function(req,res) {
  const { message } = req.body;
  instance.get('/sendMessage',
    { 
      data: {
        chat_id: message.chat.id,
        text: 'HI I CAN SEND A MESSAGE!!'
      }
    }
  )
  .then(response => {
    console.log('Message posted')
    res.send('ok')
  })
  .catch(err => {
    console.log('Error :', err)
    res.send('Error :' + err)
  });
})

app.get("/", function(req, res) {
  instance.get("/getMe")
  .then(response => {
    console.log("success");
    console.log(response.data);
    res.send(response.data.ok);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});