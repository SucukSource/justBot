exports.run = (bot, msg, params) => {
  let dis = require('discord.js');
   
  
  if(!msg.member.voiceChannel) return msg.channel.send(new dis.RichEmbed()
  .setColor(13632027)
  .setDescription(`Bitte gehe zuerst in den Channel, wo ich bin.`))
  
  if(!msg.guild.me.voiceChannel) return msg.channel.send(new dis.RichEmbed()
  .setColor(13632027) //13632027
  .setDescription(`Ich bin in keinem Channel.`))
  
  if(msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) return msg.channel.send(new dis.RichEmbed()
  .setColor(13632027) //13632027
  .setDescription(`Bitte gehe in den gleichen Raum wie ich.`))
  
  msg.guild.me.voiceChannel.leave();
  
  msg.channel.send(new dis.RichEmbed()
  .setColor(2563775) //13632027
  .setDescription(`Ich gehe.`))

};

exports.help = {
  name : "leave",
  description: "Musik stoppen",
  shown: true
};
