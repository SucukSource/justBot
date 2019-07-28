exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const embed = new dc.RichEmbed();
  switch(args[0]) {
    case "log":
      require('../einstellungen/log.js').run(bot, msg, args)
      break;
    case "umfragenchannel":
      require('../einstellungen/umfragenchannel.js').run(bot, msg, args)
      break;
    case "chat":
      require('../einstellungen/chat.js').run(bot, msg, args)
      break;
    default:
      embed.setTitle("🛠 Einstellungen")
      embed.setDescription(
      "`umfragenchannel` - Stellt den Umfragen-Channel ein\n"+
      "`log` - Setzt den Log-Channel\n"+
      "`chat` - Setzt den Global-Chat")
      embed.setColor("GREY")
  
      embed.setFooter("Benutzung: ,settings [Einstellung] [Wert]")
  
      msg.channel.send(embed)
      break;
      
  }
  
}
exports.help = {
  description: "Du willst was einstellen? Hier kannst du das!",
  shown: true,
};