exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(args.length < 1) return msg.channel.send("Kannst du mir bitte noch einen Grund geben?")
  msg.channel.send({file: new dc.Attachment("https://patricks-img-srv.glitch.me/banned?text="+args.join(' '), "banned.jpg")})
}//
exports.help = {
  name : "banned",
  description: "Macht einen Banned-Meme",
  shown: true,
  kategorie: "fun"
};
