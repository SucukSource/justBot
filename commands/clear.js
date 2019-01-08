exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  var success = new dc.RichEmbed()
 if(msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id === bot.settings.owner){
   if(!isNaN(args[0]) == false){
        return;
      }
   var numberofmsgs = parseInt(args[0])+1;
   if(numberofmsgs > 99){ msg.channel.send("Nummer zu groß."); return;}
   msg.channel.bulkDelete(numberofmsgs).then(function(){
    success.setColor("GREEN")
    success.setAuthor(msg.author.tag, msg.author.avatarURL)
     success.setDescription(`${msg.author.tag} löschte ${numberofmsgs-1} Nachrichten in ${msg.channel}.`)
     bot.logger.toChannel(msg.guild, success)
   }).catch(function(err){ 
     msg.channel.send('Ich habe nicht die richtigen Permissions.').then(mess =>{ mess.delete('5000'); }) 
   })
 }else{
  msg.channel.send(bot.quickEmbed('Dazu hast du keine Rechte.', "13584"))
 }
  
}
exports.help = {
  name : "clear",
  description: "Löscht Nachrichten",
  shown: true
};
