exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
  if(!isInArray(msg.author.id, bot.settings.teammitglieder)) return msg.channel.send("Darfst du nicht!").then(function(sent){
    msg.delete(2000)
    sent.delete(2000)
  })
  bot.activity_list.push(args.join(' '))
  msg.channel.send(new dc.RichEmbed()
                    .setTitle("Ayy!")
                    .setDescription("Dein Spiel `"+args.join(' ')+"` wurde hinzugefügt!"+
                                   "\n\nEs wird aber nur für diese Session bleiben, also bitte merke dir das.")
                    .setColor("00ff00"))
 
}
exports.help = {
  name : "addgame",
  description: "Fügt ein Spiel hinzu (Temporär)",
  shown: false
};

     function isInArray(value, array) {
  return array.indexOf(value) > -1;
}