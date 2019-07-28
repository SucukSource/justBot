exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const ideen = bot.channels.get('539123732900478976')
 const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
 if(args.length < 1){
  return msg.channel.send(errorembed.setTitle("Da fehlt was!").setDescription("Bitte mehr Argumente.\nBenutzung: ,idee [Idee zum abgeben]"))
 }
  msg.channel.send(new dc.RichEmbed().setTitle("Danke..").setDescription(".. für deine Idee!\nDeine Idee war: `"+args.join(' ')+"`").setColor("GREEN"))
  ideen.send(new dc.RichEmbed().setAuthor(msg.author.tag, msg.author.displayAvatarURL).setDescription(`Idee: \`${args.join(' ')}\``).setColor('YELLOW').setFooter(`Seine ID: ${msg.author.id}`))
 
}
exports.help = {
  name : "idee",
  description: "Lässt dich Ideen abgeben",
  shown: true,
  kategorie: "anderes"
};
