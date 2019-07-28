

exports.run = (bot, msg, args) => {
  const dc = require('discord.js')

  if(!msg.mentions.channels.first()){
   return msg.channel.send("Bitte gebe mir einen Channel.") 
  }
  var channelid = msg.mentions.channels.first().id;
  if(!msg.member.permissions.has("MANAGE_GUILD")) msg.channel.send(new dc.RichEmbed()
    .setTitle("Nope")
                    .setDescription("Darfste nicht.")
                    .setColor("RED")
                    .setFooter(`Ausgeführt von ${msg.author.tag}`, msg.author.avatarURL));
    bot.db.noServerCreate(msg.guild.id)
    bot.db.serverSet(msg.guild.id, "logchannel", channelid)
    msg.channel.send(new dc.RichEmbed()
    .setTitle("Erfolg!")
                    .setDescription("Du hast erfolgreich den Log-Channel zu " + msg.mentions.channels.first() + " gesetzt.")
                    .setColor("GREEN")
                    .setFooter(`Ausgeführt von ${msg.author.tag}`, msg.author.avatarURL))
    msg.mentions.channels.first().send("Ab jetzt werde ich hier meine Dinge loggen.")
  
}