exports.run = async (bot, msg, params) => {
  let dis = require('discord.js');
  let queueembed = new dis.RichEmbed();
  let ytdl = require('ytdl-core')
  let ms = require('ms')
  var str = "";
  if(!msg.guild.voiceConnection) return msg.channel.send("Da ich in keinem Voicechannel bin, ist auf diesem Server keine Queue!");
  var i = 0;
  var server = require('./play.js').getServers()[msg.guild.id]
  server.songTitles.map(function(url){
    if(i === 0) return i++;
    str = str+`\`${server.songTitles[i]}\`\n`
    i++
  })
  try{
    setTimeout(function(){
      queueembed.addField("Spielt gerade", `\`${server.songTitles[0]}\`\n:arrow_forward: \`${ms(server.dispatcher.time)}\``)
      console.log(str)
      console.log(str.length)
      if(str.length !== 0) queueembed.addField("Queue", str)
      msg.channel.send(queueembed).catch(e=>msg.channel.send("Ein Fehler ist aufgetreten.\n\n`"+e+"`"))
    }, 100)
  }catch(e) {
    msg.channel.send("Ein Fehler ist aufgetreten.")
  }
  
  
};

exports.help = {
  description: "Zeigt die Queue an",
  shown: false
};
