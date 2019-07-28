exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!bot.settings.teammitglieder.includes(msg.author.id))
    return;
  console.log(args.length);
  if(args.length < 1) return;
  var usrd = args[0]
  var usr = msg.mentions.users.first();
  try{
    usr = bot.users.find('tag', args.join(' ').split(" --unmute")[0])
    usrd = usr.id;
  }catch(e){};
  
  if(args[1] === "--unmute"){
    bot.db.userSet(usrd, "globalchat.mute", false);
    return msg.channel.send(new dc.RichEmbed()
                            .setTitle("Erfolg!")
                            .setDescription(`Der User ${usr} wurde entmutet.`));
  }
    bot.db.userSet(usrd, "globalchat.mute", true);
        return msg.channel.send(new dc.RichEmbed()
                            .setTitle("Erfolg!")
                            .setDescription(`Der User ${usr} wurde gemutet.`));
  
}
exports.help = {
  description: "",
  shown: false
};
