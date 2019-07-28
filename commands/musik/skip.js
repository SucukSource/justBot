exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!msg.guild.voiceConnection) return msg.channel.send("Ich bin nichtmal da!")
  try{
  var server = require('./play.js').getServers()[msg.guild.id]
  if(!msg.guild.voiceConnection.channel.members.has(msg.author.id)) return msg.channel.send("Du bist nicht bei mir!")
  if(server.voter.includes(msg.author.id)) return msg.channel.send("Du hast schon gevotet!")
  if(msg.member.permissions.has("MOVE_MEMBERS")){
    if(server.dispatcher) server.dispatcher.end();
    server.votes = 0;
    server.voter = [];
    return;
  }
  server.voter.push(msg.author.id);
  server.votes = server.votes+1;
  if(server.votes+1 > msg.guild.voiceConnection.channel.members.size-1){
    if(server.dispatcher) server.dispatcher.end();
    server.votes = 0;
    server.voter = [];
  }else{
    msg.channel.send(new dc.RichEmbed().setColor("RED")
             .setTitle("Skip-Abstimmung")
             .setDescription(`Es fehlen nurnoch \`${msg.guild.voiceConnection.channel.members.size-1-server.votes}\` Votes!`))
  }
  }catch(e){
    msg.channel.send("Ein Fehler ist aufgetreten.")
  }
  
  
  
  
}
exports.help = {
  description: "Skippt einen Song",
  shown: true
};