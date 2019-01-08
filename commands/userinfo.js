exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
 const userembed = new dc.RichEmbed()
 const moment = require('moment')
 moment.locale("de-at")
                   
 const user = msg.mentions.users.first()
 if(!user){
   errorembed.setTitle('Nö!')
   .setDescription('Gebe mir einen User!')
   return msg.channel.send(errorembed)
 }
  
  userembed.setAuthor(user.tag, user.avatarURL, user.avatarURL)
           .setDescription("Status: "+bot.statusChecker(user.presence.status))
  if(user.presence.game){
    userembed.addField("Spielt", user.presence.game.name)
  }
  userembed.addField("Erstellt", `am ${moment(user.createdTimestamp).format("Do MMMM YYYY")}`)
  userembed.addField("Mehr Informationen", `Er hat die ID ${user.id},\n und ist mit dem [Discriminator](https://media.giphy.com/media/cZaRrODh3MRXOy3OFh/giphy.gif) #${user.discriminator} etwas spezielles.`)
  
  userembed.setThumbnail(user.displayAvatarURL)
  
  userembed.setFooter(`Er ist seit ${moment(user.createdTimestamp).format("YYYY")} dabei.. eine Legende.`)
  
  msg.channel.send(userembed)
 
}
exports.help = {
  name : "userinfo",
  description: "Informationen über einen bestimmten Menschen",
  shown: true
};
