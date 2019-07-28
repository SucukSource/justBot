exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  msg.channel.send(':postbox: Check deine DMs, mate.');
  msg.author.send(new dc.RichEmbed()
                 .setTitle('Du willst mich einladen?')
                 .setDescription("Hier kannst du.\n"+
                                 "[Lade mich ein!](https://discordapp.com/oauth2/authorize?client_id=505024018961661953&scope=bot&permissions=19456)\n"+
                                "Du kannst auch auf den Discord meines Schöpfers gehen!\n"+
                                "[KLICK HIER!](https://discord.gg/EAThVMX)"+
                                '\n\nIch habe auch einen Server!\n'+
                                '**[KLICK HIER!](https://discord.gg/vaFYuhg)**')
                 .setColor(13584));
}
exports.help = {
  description: "Wie du mich einladen kannst.",
  shown: true
};
