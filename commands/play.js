exports.run = async (bot, msg, args) => {
  const dis = require("discord.js")
  const ytdl = require('ytdl-core');
  const playembed = new dis.RichEmbed();
  const YouTube = require("discord-youtube-api");
  const youtube = new YouTube(process.env.YT_TOKEN);
  
  // Anti-CreeperGameFreak
  //if(msg.author.id === "387243500502253580") return msg.channel.send('no u');
  
  var url = args[0];
  
  if(!args[0]) return msg.channel.send(new dis.RichEmbed()
  .setColor(153, 0, 0) //13632027
  .setDescription(`Bitte gebe mir einen Suchbetreff oder einen Link.`))
  
  let validate = await ytdl.validateURL(args[0]);
  if(!validate){   
    const video = await youtube.searchVideos(args.join(' '));
    url = video.url
        
        
        }

  
  let info = await ytdl.getInfo(url);
  let connection = await msg.member.voiceChannel.join();
  let dispatcher = await connection.playStream(ytdl(url, { filter: 'audioonly' }));
  
  
  
  msg.channel.send(new dis.RichEmbed()
  .setColor(102, 0, 255)
                   
  .addField('Video', info.title, false)
  .addField('Kanal', info.author.name, true)
                   
  .setThumbnail(info.author.avatar)
  .setImage(info.thumbnail_url))
  

};

exports.help = {
  name : "play",
  description: "Spielt Musik ab",
  shown: true
};

