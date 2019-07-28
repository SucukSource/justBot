exports.run = async (bot, msg, args) => {
  
  const dc = require('discord.js')
  const moment = require('moment')
  const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  moment.locale('de-de')
  function checkBots() {
    let botCount = 0;
    msg.guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }
  if(msg.guild === null){errorembed.setTitle("Ehh, nope.").setDescription("In den PMs bitte nicht!"); return msg.channel.send(errorembed)}
  
  
  var embed = new dc.RichEmbed();
  
  if(msg.guild.emojis.size > 0) embed.addField(`Emojis (${msg.guild.emojis.size})`, msg.guild.emojis.map(e=>e).join(', '))
  
  embed.setAuthor(msg.guild.name, msg.guild.iconURL)
  
  embed.addField("Erstellung", moment(msg.guild.createdAt).format('Do MMMM YYYY'))
  embed.addField(`Member (${msg.guild.members.size})`, `${msg.guild.members.size-checkBots()} Leute, ${checkBots()} Bots`)
  embed.addField(`Rollen (${msg.guild.roles.size})`, msg.guild.roles.sort((a,b)=> b.position-a.position).map(role=>role.toString()).join(', '))
  
  embed.setFooter("Besitzer: "+msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL)
  embed.setThumbnail(msg.guild.iconURL)
  
  msg.channel.send(embed);
  
}
exports.help = {
  description: "Informationen über den Server",
  shown: true
};
