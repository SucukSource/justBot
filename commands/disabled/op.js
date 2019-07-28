exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  msg.author.send(bot.quickEmbed("Du bist nun OP.", "13"))
  msg.delete(1000);
  
}
exports.help = {
  name : "op",
  description: "Macht dich Operator.",
  shown: true,
  kategorie: "fun"
};
