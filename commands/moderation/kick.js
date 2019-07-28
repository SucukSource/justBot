exports.run = (bot, msg, args) => {
  const dc = require('discord.js');
  const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  const kickembed = new dc.RichEmbed().setColor("GREEN").setTitle("Bum!")
  var reason = args.slice(1).join(' ')
  if(args.length < 1 ){errorembed.setTitle("Ich konnte den Typen nicht finden."); errorembed.setDescription("Er ist wahrscheinlich in eine Wüste geflüchtet."); return msg.channel.send(errorembed);}
  if(msg.mentions.users.first){
    if(msg.member.permissions.has("KICK_MEMBERS")){
      if(msg.guild.me.permissions.has("KICK_MEMBERS")){
        if(reason === "")reason="Nicht definiert";
                  const bantyp = msg.guild.member(msg.mentions.users.first() || msg.guild.members.find('displayName', args[0]))
          if(!bantyp){errorembed.setTitle("Ich konnte den Typen nicht finden."); errorembed.setDescription("Er ist wahrscheinlich in eine Wüste geflüchtet."); return msg.channel.send(errorembed);}
          
        kickembed.setDescription(`${bantyp.user.username}#${bantyp.user.discriminator} wurde gekickt.`)
        .addField("Moderator", `${msg.author.username}#${msg.author.discriminator}`, true)
        .addField("Grund", reason, true)
        .setAuthor(msg.author.tag, msg.author.avatarURL)
        
        
        
          bantyp.kick(`${msg.author.username}#${msg.author.discriminator} - ${reason}`).then(function(){msg.channel.send(kickembed); bot.db.toLogChannel(msg.guild, kickembed)}).catch(function(error){
            errorembed.setTitle("Oh nein! Ein Fehler ist aufgetreten!")
            errorembed.setDescription("Irgendwas ist passiert.. Wahrscheinlich ist dieser Nutzer über mir, oder auf der selben Stufe.\n\n"+
                                     "Etwas technischer:\n `"+error+"`")
            msg.channel.send(errorembed);
          })
        
        }else{
          

          
          errorembed.setTitle("Mir fehlt das Recht zum kicken!")
        errorembed.setDescription("Wenn ich keine Rechte zum kicken habe, dann kann ich schwer jemanden kicken.")
        
        return msg.channel.send(errorembed);
          
        }
      }else{

        errorembed.setTitle("Dir fehlen ein paar Rechte, Freundchen!")
        errorembed.setDescription("Du brauchst Kick-Rechte auf diesem Discord, wenn du jemanden kicken möchtest.")

        return msg.channel.send(errorembed);
      }
  }else{
   
    errorembed.setTitle("Da fehlt doch was!");
    errorembed.setDescription("Bitte tagge einen User, den ich kicken soll.")
    
    return msg.channel.send(errorembed);
    
  }
  
  
  
  
  
}
exports.help = {
  description: "Kickt jemanden",
  shown: true
};