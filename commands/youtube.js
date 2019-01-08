exports.run = async (bot, msg, args) => {
 const dc = require('discord.js')
 const errorembed = new dc.RichEmbed().setColor(153, 0, 0)
 const successembed = new dc.RichEmbed().setColor(85,26,139)
 
 if(args < 1){errorembed.setTitle("Bitte gebe mir einen Suchbegriff!").setDescription("Benutzung: ,youtube [Suchbegriff]")
             msg.channel.send(errorembed); return}
   const YouTube = require("discord-youtube-api");
   const youtube = new YouTube(process.env.YT_TOKEN);
  
    await youtube.searchVideos(args.join(' ')).then(function(vid){
      console.log(vid)
      
      successembed.setDescription("Hier ist dein Video!")
      successembed.addField("Titel", vid.title)
      successembed.addField("Link", `https://youtu.be/${vid.id}`)
      msg.channel.send(successembed)
    });
  
}
exports.help = {
  name : "youtube",
  description: "Sucht nach YouTube Videos",
  shown: true
};
