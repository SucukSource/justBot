exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 var longstring = "";
  const embed1 = new dc.RichEmbed().setDescription('Hilfe ist hier!').setColor(13584).setTimestamp(new Date())
  const embed2 = new dc.RichEmbed().setColor(13584).setTimestamp(new Date())
  const embed3 = new dc.RichEmbed().setColor(13584).setTimestamp(new Date())
  
  bot.commands.tap(function(cmd){
               console.log('longstring')
                     if(cmd.help.shown){longstring += "`"+`${cmd.help.name}`+"`"+ ` - ${cmd.help.description}\n`}
  })
    embed1.addField("💾 Befehle", longstring);
  
  embed2.addField("💳 Credits", "Erstellt von: [zImPatrick](https://twitter.com/zImPatrick_)\n" +
                            "Geholfen haben: \n» [Dayly](https://twitter.com/Dayly_Smile)\n» Menschen.");
  
  embed3.addField("⏸ Info", "Im Moment sind wir in der Version **"+bot.version+"**.\n" +
                            "Danke an jeden der geholfen hat.\n"+
                            "Wir haben auch ein [Trello Board](https://trello.com/b/1Huyw83E/justbot).\n"+
                            "Da kannst du sehen, was wir noch alles geplant haben. Da kommt immer mehr dazu!");
  
  
  embed3.setFooter('Erstellt durch Patrick#5466 | ,invite')
  
 msg.channel.send(embed1).then(function(){msg.channel.send(embed2).then(function(){msg.channel.send(embed3)})})
  
}
exports.help = {
  name : "help",
  description: "Hilfe.",
  shown: false
};
