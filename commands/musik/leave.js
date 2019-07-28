exports.run = (bot, msg, params) => {
  let dis = require('discord.js');
   
  if(msg.author.id === "466627216252338177") return msg.channel.send("no u")
  if(msg.member.permissions.has('ADMINISTRATOR')) {
     if(!msg.member.voiceChannel) return msg.channel.send(new dis.RichEmbed()
  .setColor("5")
  .setDescription(`Bitte gehe zuerst in den Channel, in dem ich bin.`))
  
  if(!msg.guild.me.voiceChannel) return msg.channel.send(new dis.RichEmbed()
  .setColor("5") //13632027
  .setDescription(`Ich bin in keinem Channel.`))
  
  if(msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) return msg.channel.send(new dis.RichEmbed()
  .setColor("5") //13632027
  .setDescription(`Bitte gehe in den gleichen Raum wie ich.`))
  
  msg.guild.me.voiceChannel.leave();
  
  msg.channel.send(new dis.RichEmbed()
  .setColor("5") //13632027
  .setDescription(`Ich gehe.`))
  if(!require('./play.js').getServers()[msg.guild.id]) return;
  var queue = require('./play.js').getServers()[msg.guild.id].queue
  queue.splice(0,queue.length)
  } else msg.channel.send(new dis.RichEmbed()
                         .setTitle("Hey!")
                         .setDescription("Benutze `,skip` dafür.")
                         .setColor("GOLD"))
  


};

exports.help = {
  description: "Musik stoppen",
  shown: true
};
