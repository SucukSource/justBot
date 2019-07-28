var weather = require('weather-js')

exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  
  weather.find({search: args.join(' '), degreeType: 'C', lang: "de-at"}, function(err, result) {
    if(err) return msg.channel.send(
      new dc.RichEmbed()
      .setTitle("Oh..")
      .setDescription("Ein Fehler ist aufgetreten.\n\n`"+err+"`")
    .setColor("RED"))
     
      if(result.length === 0) return msg.channel.send(
      new dc.RichEmbed()
      .setTitle("Eh..")
      .setDescription("Der Ort `"+args.join(' ')+"` wurde nicht gefunden.")
      .setColor("RED"))
    
    var u = result[0];
    var current = u.current;
    var embed = new dc.RichEmbed()
    .setTitle(u.location.name)
    .setDescription(`${current.skytext}\n`)
    .addField("Temparatur", current.temperature+"°C", true)
    .addField("Wind", current.windspeed, true)
    .setThumbnail(current.imageUrl)
    msg.channel.send(embed)
  });
};
exports.help = {
  name : "wetter",
  description: "Du willst das Wetter irgendwo sehen? Jetzt kannst du's!",
  shown: true,
  kategorie: "anderes"
};

// sry patrick 

// was'n hier los?