exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  var longstring = "";
  const embed1 = new dc.RichEmbed().setColor("13584").setTimestamp(new Date())
  const embed2 = new dc.RichEmbed().setColor("13584").setTimestamp(new Date())
  if(args.length > 0){
    if(args.join(' ').toLowerCase() === "einstellungen") return require('./settings.js').run(bot, msg, args)
    bot.commands.tap(function(cmd){
      if(cmd.help.shown){
        //longstring += "`"+`${cmd.help.name}`+"`"+ ` - ${cmd.help.description}\n`
        if(cmd.help.kategorie === args.join(' ').toLowerCase()) longstring += "`"+`${cmd.help.name}`+"`"+ ` - ${cmd.help.description}\n`
      }
    })
    var size = longstring.split('\n').length-1;
    if(longstring !== "") embed1.addField("💾 "+size+" Befehle für "+args.join(' '), longstring);
    if(longstring === "") embed1.setTitle("Keine Ergebnisse für diese Kategorie gefunden.")
      .setDescription(`Für die Kategorie \`${args.join(' ').toLowerCase()}\` wurden keine Befehle gefunden.`)
  }
  if(args.length < 1){
    require('../../data/kategorien.json').map((kategorie) => {
      embed1.addField(kategorie.displayName, ",help "+kategorie.name)
    })
    embed1.setTitle("Alle Kategorien").setDescription("Alle Kategorien, die du dir anschauen kannst")
  }
  
  
  embed2.addField("💳 Credits", 
                  "Erstellt von: [zImPatrick](https://twitter.com/zImPatrick_)\n" +
                  "Geholfen haben: \n» [Dayly](https://twitter.com/Dayly_Smile)\n"+
                  "» [Justin/CGF](https://twitter.com/JustinCGFBackup)\n");
  embed2.setFooter('Invite mich! | ,invite')
  if(args.length < 1) msg.channel.send(embed1)
    .then(() => {
    msg.channel.send(embed2)
  })
  if(args.length > 0) msg.channel.send(embed1)
  
}
exports.help = {
  description: "Hilfe.",
  shown: false
};