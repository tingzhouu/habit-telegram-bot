// For /checkOutNow command
function checkOutCommand(bot) {
  bot.command("checkOutNow", (ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}, you are now checked out!`);
  });
}

module.exports = {
  checkOutCommand: checkOutCommand
};
