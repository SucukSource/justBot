  var Twit = require('twit')
 
  var T = new Twit({
    consumer_key:         process.env.TWIT_CONSUMER_KEY,
    consumer_secret:      process.env.TWIT_CONSUMER_SECRET,
    access_token:         process.env.TWIT_ACCESS_TOKEN,
    access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
  });
  

exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(args.length < 1) return msg.channel.send("Was soll ich tweeten?")
  if(msg.attachments.first()) msg.channel.send("[Information] Bilder/Videos etc. werden nicht versendet.")
  T.post('statuses/update', { status: msg.author.tag+": "+args.join(' ')}, (err, data, resp) => {
    if(err) return msg.channel.send("Ein Fehler ist aufgetreten."+"\n```"+err+"```")
    msg.channel.send("https://twitter.com/justBotDC/status/"+data.id_str)
  })
};
exports.help = {
  description: "Tweetet auf dem [justBot(); Twitter Account](https://twitter.com/justBotDC)",
  shown: true
};