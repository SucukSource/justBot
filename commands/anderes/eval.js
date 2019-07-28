exports.run = async (bot, msg, args) => {
  const dc = require('discord.js')
  const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  if(!isInArray(msg.author.id, bot.settings.teammitglieder)){
    errorembed.setTitle("So läuft der Hase nicht!").setDescription("Du musst ein Teammitglied von diesem Bot sein, damit du diesen Befehl ausführen kannst.")
    return msg.channel.send(errorembed)
  }
  
  var embed = new dc.RichEmbed()
  .setAuthor(msg.author.tag, msg.author.avatarURL)
    var output;
    try{
      output = eval(args.join(' '))
      embed.setColor("GREEN")
      embed.setDescription(`\`${output}\``)
    }
    catch (err) {
      embed.setColor("RED")
      embed.setTitle("❗ Ein Fehler ist aufgetreten.")
      embed.setDescription(`\`${err}\``)
    }
  
  msg.channel.send(embed)
  
}
exports.help = {
  description: "Lässt dich Code ausführen.",
  shown: false
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}