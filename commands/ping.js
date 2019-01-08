exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const thonking = bot.emojis.get("517780955453456395");
  var pingembed = new dc.RichEmbed();
  
  pingembed.addField("Ping", "Meiner: `" + Math.round(bot.ping) + "ms`\n"+
                              "Deiner: `"+ Math.floor(Math.random()*(600-21+1)+21) + "ms`")
  
  pingembed.setColor(Math.random()*(19240-1540+1)+1540)
  msg.channel.send(thonking.toString()).then(mess => {
    setTimeout(function(){mess.edit(pingembed)}, 300)
  })
}
exports.help = {
  name : "ping",
  description: "Pong.",
  shown: true
};
