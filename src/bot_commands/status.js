function statusCommand(bot) {
  bot.command(["status", "status@janet_habit_bot"], ctx => {
    //retrieve all users

    //check if each user has checked in for the day

    //display telegram id, has checked in / has not checked in
  });
}

module.exports = {
  statusCommand: statusCommand
}