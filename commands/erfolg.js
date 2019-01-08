

exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  msg.channel.send(new dc.RichEmbed()
                  .setColor(1435)
                  .setImage("https://www.minecraftskinstealer.com/achievement/a.php?i=7&h=Erfolg+erzielt%21&t=" + args.join('+')));
}
exports.help = {
  name : "erfolg",
  description: "Macht dir einen eigenen Erfolg!.",
  shown: true
};
