exports.run = (bot, msg, args) => {
  const dc = require('discord.js');
  const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  const bannedembed = new dc.RichEmbed().setColor(0, 0, 153).setImage("https://i.imgur.com/yknPkF6.gif");
    const logembed = new dc.RichEmbed()
  var reason = args.slice(1).join(' ')
  if(msg.mentions.users.first){
    if(msg.member.permissions.has("BAN_MEMBERS") || msg.author.id === bot.settings.owner){
      if(msg.guild.me.permissions.has("BAN_MEMBERS")){
        
                  const bantyp = msg.guild.member(msg.mentions.users.first())
          if(!bantyp){errorembed.setTitle("Ich konnte den Typen nicht finden."); errorembed.setDescription("Er ist wahrscheinlich in eine Wüste geflüchtet."); return msg.channel.send(errorembed);}
          
        if(reason === "") reason="Nicht definiert";
        
          bantyp.ban(`${msg.author.username}#${msg.author.discriminator} - ${args.slice(1).join(' ')}`).then(function(){
            console.log(reason)
            logembed.setAuthor(msg.author.tag, msg.author.avatarURL)
              .setColor("GREEN")
              .setDescription(`${bantyp.user.tag} wurde von ${msg.author.tag} verbannt.`)
              .addField("Grund", reason)
                        
            bannedembed.setAuthor(msg.author.tag, msg.author.avatarURL)
              .setDescription(`${bantyp.user.tag} wurde von ${msg.author.tag} verbannt.`)
              .addField("Grund", reason)
            msg.channel.send(bannedembed)
            bot.db.toLogChannel(msg.guild, logembed)
          }).catch(function(error){
            errorembed.setTitle("Oh nein! Ein Fehler ist aufgetreten!")
            errorembed.setDescription("Irgendwas ist passiert.. Wahrscheinlich ist dieser Bot über mir, oder auf der selben Stufe.\n\n"+
                                     "Etwas technischer:\n `"+error+"`")
            msg.channel.send(errorembed);
          })
        
        }else{
          

          
          errorembed.setTitle("Mir fehlt das Recht zum bannen!")
        errorembed.setDescription("Wenn ich keine Rechte zum bannen habe, dann kann ich schwer jemanden bannen.")
        
        return msg.channel.send(errorembed);
          
        }
      }else{

        errorembed.setTitle("Dir fehlen ein paar Rechte, Freundchen!")
        errorembed.setDescription("Du brauchst Ban-Rechte auf diesem Discord, wenn du jemanden bannen möchtest.")

        return msg.channel.send(errorembed);
      }
  }else{
   
    errorembed.setTitle("Da fehlt doch was!");
    errorembed.setDescription("Bitte tagge einen User, den ich bannen soll.")
    
    return msg.channel.send(errorembed);
    
  }
  
  
  
  
  
}
exports.help = {
  description: "Den Banhammer werfen",
  shown: true
};
