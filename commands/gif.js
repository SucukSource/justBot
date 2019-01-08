// 
exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const giphy = require('giphy-api')(process.env.GIPHY_KEY);
const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  if(args < 1){ errorembed.setTitle("oof!").setDescription("Ich brauche einen Suchbegriff."); return msg.channel.send(errorembed)}
  
giphy.random(args.join(' '), function (err, res) {
  if(err){errorembed.setTitle("Oops!").setDescription("Irgendjemand springt am Server rum.. es geht nicht!"); return msg.channel.send(errorembed)}
  msg.channel.send(new dc.RichEmbed()
                   .setTitle(res.data.title)
                   .setImage(res.data.image_original_url))
});

}
exports.help = {
  name : "gif",
  description: "Sucht nach GIFs",
  shown: true
};
