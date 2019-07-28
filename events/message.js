var coinCooldown = new Set();
module.exports = (bot, message) => {
  const prefix = ","
  
  const dc = require('discord.js')
  // Maintenance-Check
  if(bot.settings.maintenance && 
     !bot.settings.teammitglieder.some(e=>e === message.author.id))
    return;
  
  // AFK-Check
  if(message.mentions.users.first()){
    if(bot.afk.some(i => message.mentions.users.first().id === i)){
      message.channel.send(new dc.RichEmbed()
                           .setTitle("Hey!")
                           .setDescription("Der Typ, den du gerade getaggt hast, ist AFK!\nEr antwortet jetzt wahrscheinlich nicht.")
                           .setFooter("In anderen Wörtern: Er ist AFK und sollte nicht antworten. 💤")
                           .setColor("RED"))
      
    }}
  // Bot-Check
  if(message.author.bot) return;
  
  // DM-Check
  if(message.content.startsWith(prefix) && !message.guild) 
    message.channel.send("Du kannst hier keine Befehle ausführen!")
  if(!message.guild) return;
  
  // Global-Chat
  if(message.channel.id === bot.db.serverGet(message.guild.id, "globalchat")){
    if(bot.db.userGet(message.author.id, "globalchat.mute")) return;
    var channels = [];
    bot.db.getDB()
      .get('servers')
      .reject({globalchat: undefined})
      .value()
      .map(server => {
      var channel = bot.channels.get(server.globalchat);
      if(channel) channels.push(channel)
    })
    
    var embed = new dc.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(message.content.replace(new RegExp(/[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/, 'g'), "**[LINK ENTFERNT]**"))
    .setColor(message.member.displayHexColor)
    .setFooter(message.guild.name, message.guild.iconURL)
    if(message.author.id === "137228543045140480") embed.setDescription(message.content);
    message.delete().catch(()=>{});
    channels.map(c => c.send(embed).catch(()=>{}));
    console.log(`[GLOBAL-CHAT] ${message.author.tag}: ${message.cleanContent}`)
    return;
  }
  // Umfragen-Channel
  if(message.channel.id === bot.db.serverGet(message.guild.id, "umfragenchannel")){
    message.react('👍').then(()=>setTimeout(()=>message.react("👎"), 1000));
  }
  
  // Prefix-Check
  if(!message.content.startsWith(prefix)) return;
  
  
  // Definitionen
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = bot.commands.get(command);
  
  // Wenn es kein Befehl ist, returnen.
  if(!cmd) return;
  
  // Wenn der User aus dem Bot gebannt ist, returnen.
  if(bot.db.userGet(message.author.id, "botbanned")) return;
  
  // In der Konsole loggen
  console.log(`[BEFEHL] ${message.author.username}: ${message.cleanContent}`);
  
  // Für die Stats-Website
  bot.db.addUse();
  
  // User zur DB hinzufügen
  bot.db.noUserCreate(message.author.id);
  
  // Coins!
  if(!coinCooldown.has(message.author.id)) {
    bot.db.addCoins(message.author.id, Math.floor(Math.random() * 10 + 1));
    coinCooldown.add(message.author.id);
    setTimeout(() => coinCooldown.delete(message.author.id), 5000);
  };
  
  // Befehl ausführen
  cmd.run(bot, message, args);
  
}

