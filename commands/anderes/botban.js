exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!bot.settings.teammitglieder.includes(msg.author.id))
    return;
  console.log(args.length);
  if(args.length < 1) return;
  var usrd = args[0]
  var usr = msg.mentions.users.first();
  try{
    usr = bot.users.find('tag', args.join(' ').split(" --unban")[0])
  }catch(e){};
  try{usrd = usr.id}catch(e){};
  
  if(args[1] === "--unban"){
    bot.db.userSet(usrd, "botbanned", false);
    return msg.channel.send(new dc.RichEmbed()
                            .setTitle("Erfolg!")
                            .setDescription(`Der User ${usr} wurde entbannt.`));
  }
    bot.db.userSet(usrd, "botbanned", true);
        return msg.channel.send(new dc.RichEmbed()
                            .setTitle("Erfolg!")
                            .setDescription(`Der User ${usr} wurde gebannt.`));
  
}
exports.help = {
  description: "Bannt Leute vom Bot",
  shown: false
};
