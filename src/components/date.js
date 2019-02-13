// to get a date string
const moment = require("moment-timezone");


function getDateString(date) {
  return moment(date).tz("Asia/Singapore").format("ddd DD MMM, h:mma");
}

function convertDateToSGT(date) {
  return moment.tz(date, "Asia/Singapore")
}

module.exports = {
  getDateString: getDateString,
  convertDateToSGT: convertDateToSGT
};
