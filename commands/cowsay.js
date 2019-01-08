exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const cowsay = require('cowsay')
 if(args.length < 1) return msg.channel.send('Gebe mir Text, die diese Kuh sagen soll.') 

 msg.channel.send('```'+cowsay.say({text : args.join(' ')})+'```')
 
}
exports.help = {
  name : "cowsay",
  description: "Sagt was mit ner Kuh",
  shown: false
};
