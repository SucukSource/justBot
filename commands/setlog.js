

exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('/app/.secret/db.json')
const db = low(adapter)

  if(args.length < 1){
   return msg.channel.send("Bitte gebe mir einen Channel.") 
  }else if(!msg.mentions.channels.first()){
   return msg.channel.send("Bitte gebe mir einen Channel.") 
  }
  if(msg.member.permissions.has("MANAGE_GUILD")){
    if(!db.get('servers')
  .find({ serverid: msg.guild.id })
  .value()){
      db.get('servers')
    .push({  serverid: msg.guild.id, logchannel: msg.mentions.channels.first().id})
    .write()
    }else{
      db.get('servers')
  .find({ serverid: msg.guild.id })
  .set('logchannel', msg.mentions.channels.first().id)
        .write()
    }
    msg.channel.send(new dc.RichEmbed()
    .setTitle("Erfolg!")
                    .setDescription("Du hast erfolgreich den Log-Channel zu " + msg.mentions.channels.first() + " gesetzt.")
                    .setColor("GREEN")
                    .setFooter(`Ausgeführt von ${msg.author.tag}`, msg.author.avatarURL))
    msg.mentions.channels.first().send("Ab jetzt werde ich hier meine Dinge loggen.")
  }else{
    msg.channel.send(new dc.RichEmbed()
    .setTitle("Nope")
                    .setDescription("Darfste nicht.")
                    .setColor("RED")
                    .setFooter(`Ausgeführt von ${msg.author.tag}`, msg.author.avatarURL))
  }
  
  
}

exports.help = {
  name : "setlog",
  description: "Setzt den Log-Channel",
  shown: false 
}