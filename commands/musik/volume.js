exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const volume = parseInt(args[0])
  if(!volume) return msg.channel.send(new dc.RichEmbed()
  .setColor("47290")
  .setDescription(`Gebe mir vielleicht auch eine %-Anzahl. (aber ohne %)`))
  
  const server = require('./play.js').getServers()[msg.guild.id]
  if(!msg.guild.voiceConnection) return msg.channel.send(new dc.RichEmbed()
  .setColor("47290")
  .setDescription(`Ich bin hier ja in keinem Voice-Channel!`))
  
  server.dispatcher.setVolume(volume/100);
  msg.channel.send(new dc.RichEmbed()
  .setColor("GREEN")
  .setDescription(`Okay, du hörst nun Lieder mit einer Lautstärke von \`${volume}%\`!`))
  
};
exports.help = {
  description: "Ändert die Lautstärke",
  shown: true
};