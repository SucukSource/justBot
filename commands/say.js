exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const helpembed = new dc.RichEmbed();
    if(args[0] === "-noembed"){
      if(args.length < 2){
      msg.channel.send("Gebe mir eine Nachricht!");
      }else{
        msg.delete(0)
        msg.channel.send(args.slice(1).join(' '))
      }
    
    
    
    }else if(args[0] === "-options"){
    helpembed.setDescription("`-noembed` - zeigt kein Embed an")
         msg.channel.send(helpembed)
  }else{
    const embed = new dc.RichEmbed().setColor(204, 0, 204)
    
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL)
   // embed.setTitle(`${msg.member.displayName} sagt...`)
   // embed.setThumbnail(msg.author.avatarURL)
    embed.setDescription(args.join(' '))
    embed.setTimestamp(msg.createdTimestamp)
    
    msg.delete(5)
    msg.channel.send(embed)
    
       }
}
exports.help = {
  name : "say",
  description: "Lässt dich was sagen",
  shown: true
};
// spaghetti code 10/10