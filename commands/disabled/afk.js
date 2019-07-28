exports.run = (bot, msg, args) => {
  const dc = require('discord.js');
  if(bot.afk.includes(msg.author.id)){
    var ind = bot.afk.indexOf(msg.author.id);
    bot.afk.splice(ind, 1);
    msg.channel.send(new dc.RichEmbed()
                     .setTitle("Willkommen zurück!")
                     .setDescription("Da du nicht mehr AFK sein willst, wurdest du rausgenommen.")
                     .setFooter('💤')
                     .setTimestamp(new Date())
                     .setColor("BLUE"))
    
    return;
  }
      msg.channel.send(new dc.RichEmbed()
                     .setTitle("Du wurdest in den AFK-Modus gesetzt.")
                     .setDescription("Was auch immer du machst, viel Spaß dabei!")
                     .setFooter('💤')
                     .setTimestamp(new Date())
                     .setColor("DARK_GREY"))
  bot.afk.push(msg.author.id)
}
exports.help = {
  name : "afk",
  description: "Gehe AFK.",
  shown: true,
  kategorie: "allgemein"
};
