var speedTest = require('speedtest-net');

exports.run = (bot, msg, args) => {
  const dc = require('discord.js');
  var test = speedTest({maxTime: 5000});
  msg.channel.send("Paar Sekunden...").then((m) => test.on('data', data => {
    m.edit(new dc.RichEmbed()
          .addField("Download", Math.round(data.speeds.download)+" Mbps")
          .addField("Upload", Math.round(data.speeds.upload)+" Mbps"))
    console.dir(data);
  }));
  
  
 
  
  
}
exports.help = {
  name : "speedtest",
  description: "1 speedtest",
  shown: true,
  kategorie: "anderes"
};
