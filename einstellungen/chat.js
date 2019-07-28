exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const embed = new dc.RichEmbed()
  .setColor("RED")
  .setFooter("Ausgeführt von " + msg.author.tag, msg.author.avatarURL)
  
  if(!msg.mentions.channels.first()){
   return msg.channel.send("Bitte gebe mir einen Channel.") 
  }
  if(!msg.guild) return;
  if(!msg.member.permissions.has("MANAGE_GUILD")) 
    return msg.channel.send(embed.setTitle("Nö!").setDescription("Du hast nicht die richtigen Permissions dafür."));
  
  bot.db.noServerCreate(msg.guild.id);
  bot.db.serverSet(msg.guild.id, "globalchat", msg.mentions.channels.first().id)
  msg.channel.send(
    embed.setColor("GREEN")
      .setTitle("Perfekt!")
      .setDescription(`Der Global-Chat ist nun im Channel ${msg.mentions.channels.first()} eingestellt.`))
}