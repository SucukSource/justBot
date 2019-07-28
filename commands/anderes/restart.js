exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!bot.settings.teammitglieder.includes(msg.author.id))
    return;
  bot.restarting = true;
  msg.channel.send("Okay, ich rufe `bot.destroy()` auf.")
  bot.destroy();
  bot.login(process.env.TOKEN).then(() => {msg.channel.send("Bin wieder da!"); bot.restarting = false})
}
exports.help = {
  description: "Restartet den Bot",
  shown: false
};

