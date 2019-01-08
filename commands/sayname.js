exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 
 const member = msg.guild.member(msg.guild.members.find('displayName', args[0]))
 
 console.log(msg.guild.members)
 
 if(!member) return msg.channel.send('Nicht gefunden')
  
  msg.channel.send("Nickname: " + member.user.username)
  
 
}
exports.help = {
  name : "sayname",
  description: "Sagt einen Namen // Für's Testen benutzt",
  shown: false
};
