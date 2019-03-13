// to get a date string
const moment = require("moment-timezone");

function getDateString(date) {
  return moment(date)
    .tz("Asia/Singapore")
    .format("ddd DD MMM, h:mma");
}

function convertDateToSGT(date) {
  return moment.tz(date, "Asia/Singapore");
}

function getCheckInDuration(checkInTimeStamp, checkOutTimeStamp) {
  const difference = checkOutTimeStamp.diff(checkInTimeStamp, "minutes");
  if (difference < 60) {
    return `${difference}min`;
  } else {
    return `${Math.floor(difference / 60)} hr ${difference % 60} min`;
  }
}

module.exports = {
  getDateString: getDateString,
  convertDateToSGT: convertDateToSGT,
  getCheckInDuration: getCheckInDuration
};
