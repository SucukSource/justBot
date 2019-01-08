exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const moment = require('moment')
   const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  moment.locale('de-de')
  
  if(msg.guild === null){errorembed.setTitle("Ehh, nope.").setDescription("In den PMs bitte nicht!"); return msg.channel.send(errorembed)}
  msg.channel.send(new dc.RichEmbed()
                  .setTitle("Informationen über " + msg.guild.name)
                   .setAuthor("Besitzer: "+msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL)
                  
                  .addField("Erstellung", moment(msg.guild.createdAt).format('Do MMMM YYYY'))
                  .addField("Rollen, User & Channel", `${msg.guild.roles.size} Rollen, ${msg.guild.memberCount} Leute & ${msg.guild.channels.size} Kanäle.`)
                  .addField(`Emojis`, `${msg.guild.emojis.size}`)
                   .addField('Mehr Informationen', `Der Server ist in der Region ${msg.guild.region} und hat das Verifizierungslevel ${msg.guild.verificationLevel}.`)
                   
                  .setThumbnail(msg.guild.iconURL))
}
exports.help = {
  name : "serverinfo",
  description: "Informationen über den Server",
  shown: true
};
