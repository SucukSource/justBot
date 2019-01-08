exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  msg.channel.send(':postbox: Check deine DMs, mate.');
  msg.author.send(new dc.RichEmbed()
                 .setTitle('Du willst mich einladen?')
                 .setDescription("Hier kannst du.\n"+
                                 "[Mit Admin-Rechten](https://discordapp.com/oauth2/authorize?client_id=505024018961661953&scope=bot&permissions=8)\n"+
                                 "[Keine Rechte](https://discordapp.com/oauth2/authorize?client_id=505024018961661953&scope=bot) (dies könnte für Probleme sorgen)\n\n"+
                                "Du kannst auch auf den Discord meines Schöpfers gehen!\n"+
                                "[KLICK HIER!](https://discord.gg/EAThVMX)"+
                                '\n\nIch habe auch einen Server!\n'+
                                '**[KLICK HIER!](https://discord.gg/vaFYuhg)**')
                 .setColor(13584));
}
exports.help = {
  name : "invite",
  description: "Wie du mich einladen kannst.",
  shown: true
};

// Ich hab keinen anderen Weg gefunden, also mache ich es einfach so.
// wusste nicht dass man mit "" + (Zeilenumbruch) "" einen Command in mehrere Zeilen aufteilen kann.
// aha! So kann man also PNs schicken?

// Yep.

// Den Code nehm ich mit xD

// Kannst gerne machen

// 

// Kannst auch Links in Embeds reinmachen mit [Text](Link)
// kuhhhhhl! 