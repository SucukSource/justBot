exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const errorembed = new dc.RichEmbed();
  const port = "25565"
  const successembed = new dc.RichEmbed();
  const pinger = require('minecraft-pinger');
  errorembed.setColor(13632027)
  if(!args < 2){
    pinger.ping(args[0], args[1], (error, result) => {
      if (error){ errorembed.setTitle("Fehler").setDescription("Server `"+args[0]+"` wurde nicht gefunden oder ist offline."); msg.channel.send(errorembed); return;}
      console.log(result);
      successembed.setThumbnail("http://img10.deviantart.net/9cc9/i/2011/008/6/1/minecraft_hd_icon___mac___pc_by_hunterkharon-d36qrs5.png");
      successembed.setTitle("Server "+args[0]);
      successembed.setDescription(`Hier ist der Server ${args[0]}!`); // Was soll als Beschreibung hin?
      successembed.setColor(51, 153, 51);
      successembed.addField('Version', result.version.name, true)
      successembed.addField('Slots', `${result.players.max}`, true)
      successembed.addField('Statistiken', `${result.players.online} online\n`+
                                           `${result.players.max - result.players.online} Plätze sind frei`);
      
      console.log(result);
      msg.channel.send(successembed);
    })
  }
  
}
exports.help = {
  name : "mcserver",
  description: "Kann dir sagen, ob der Server online ist.",
  shown: true,
  kategorie: "anderes"
};