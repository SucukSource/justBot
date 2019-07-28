exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
 const userembed = new dc.RichEmbed()
 const moment = require('moment')
 moment.locale("de-at")
                   
 const user = msg.mentions.users.first();
 const member = msg.mentions.members.first();
 if(!user || !member){
   errorembed.setTitle('Nö!')
   .setDescription('Gebe mir einen User!')
   return msg.channel.send(errorembed)
 }
  
  userembed.setTitle(`${bot.statusChecker(user.presence.status)} ${user.tag}`)
  if(user.presence.game){
    userembed.addField("Spielt", user.presence.game.name)
  }
  userembed.addField("Rollen", member.roles.sort((a,b)=> b.position-a.position).map(r=>r.toString()));
  userembed.addField("ID", user.id);
  
  userembed.setThumbnail(user.displayAvatarURL);
  
  userembed.setFooter(`Registriert am`);
  userembed.setTimestamp(user.createdTimestamp);
  
  msg.channel.send(userembed)
 
}
exports.help = {
  description: "Informationen über einen bestimmten Menschen",
  shown: true
};
