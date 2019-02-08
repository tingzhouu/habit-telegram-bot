// to get a date string
const moment = require("moment");

function getDateString(date) {
  return moment().format("ddd DD MMM, h:mma");
}

module.exports = {
  getDateString: getDateString
};
