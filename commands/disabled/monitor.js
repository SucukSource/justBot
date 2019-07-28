exports.run = async (bot, msg, args) => {
  const dc = require('discord.js')
  const ms = require('ms')
  var osu = require('node-os-utils')
  var pidusage = require('pidusage')
  
  var message = await msg.channel.send("Bitte warte..")
  
  var embed = new dc.RichEmbed();
  embed.addField("Online seit", ms(bot.uptime))

  
  var usage = await pidusage(process.pid)
  
    embed.addField("CPU-Nutzung", usage.cpu+"%", true)
    embed.addField("RAM-Nutzung", formatBytes(usage.memory), true)
    embed.addField("Läuft auf", await osu.os.oos())
    if(bot.settings.teammitglieder.some(id=>id===msg.author.id)){
      embed.addField("PID", process.pid)
      embed.addField("Report", JSON.stringify(process.report))
      embed.setFooter("Du siehst nun mehr Informationen, da du ein Helfer bist") 
    }
    embed.setColor(0xa8a400) //Was sagst du zu der Farbe: 0xa8a400
  // idk, probier sie mal hier k
    
    message.edit(embed);
}
exports.help = {
  name : "monitor",
  description: "Zeigt an wie lange der Bot schon online ist, und mehr",
  shown: true,
  kategorie: "allgemein"
};

function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}