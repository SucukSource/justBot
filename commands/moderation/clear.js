exports.run = async (bot, msg, args) => {
  const dc = require('discord.js')
  var success = new dc.RichEmbed()
 if(msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id === bot.settings.owner){
   if(!isNaN(args[0]) == false){
        return;
      }
   var numberofmsgs = parseInt(args[0])+1;
   var msgs = await msg.channel.fetchMessages({ limit:parseInt(args[0])+1 });
   msgs = msgs.array();
   msgs.sort(function(a, b) {
  return  +a.createdTimestamp - +b.createdTimestamp
  })
   msg.channel.bulkDelete(numberofmsgs).then(function(){
    success.setColor("GREEN")
    success.setAuthor(msg.author.tag, msg.author.avatarURL)
     success.setDescription(`${msg.author.tag} löschte ${numberofmsgs-1} Nachrichten in ${msg.channel}.`)
     var history = "";
     msgs.map(mess => {
       console.log(mess.cleanContent)
       history += `**${mess.author.tag}**: ${mess.cleanContent}\n`;
     });
     try{
     success.addField("Gelöscht", history)
       bot.db.toLogChannel(msg.guild, success)
     }catch(e) {
       require('request').post(
    'https://api.paste.ee/v1/pastes',
    { json: { "sections":[{"name":"Chat-Log","syntax":"text","contents":history.replace(/(\*\*)/g, "")}] }, headers: { "X-Auth-Token": process.env.PASTE_EE_KEY }},
    function (error, response, body) {
        if (!error) {
          success.addField("Gelöscht", body.link);
        }
      bot.db.toLogChannel(msg.guild, success)
    }
);
     }
   }).catch(function(err){ 
     msg.channel.send('Ein Fehler ist aufgetreten!\n\n`'+err+"`").then(mess =>{ mess.delete('5000'); }) 
   })
 }else{
  msg.channel.send(bot.quickEmbed('Dazu hast du keine Rechte.', "13584"))
 }
  
}
exports.help = {
  description: "Löscht Nachrichten",
  shown: true
};
