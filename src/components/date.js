// to get a date string
const moment = require("moment-timezone");


function getDateString(date) {
  return moment(date).tz("Asia/Singapore").format("ddd DD MMM, h:mma");
}

module.exports = {
  getDateString: getDateString
};
