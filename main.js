const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

// Module
require('./modules/web/main.js').start();

// Definitionen
const bot = new Discord.Client();
const dbl = new DBL(process.env.DBL_TOKEN, bot);

// Bot einloggen lassen
console.log("[STATUS] Einloggen...")
bot.login(process.env.TOKEN)
.catch((err) => {
  console.log("Huh, wir konnten uns wohl nicht anmelden :/\nVielleicht ist dieses Glitch-Projekt gerade IP-Banned von Discord. Wer weiß?");
  console.error(err);
});

// Sachen, die ich global benutzen will
bot.afk = [];
bot.modules = [];
bot.version = "1.1";
bot.settings = require('./einstellungen.json');
bot.db = require('./modules/db.js');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.modules.dbl = dbl;

// Event/Command-Handler
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
  console.log("[DATEIEN] "+files.length + " Events geladen")
});

// Command-Handler
fs.readdir("./commands/", (err, categories) => {
  if (err) return console.error(err);
  categories.forEach(category => {
    if(category === "disabled") return;
    fs.readdir("./commands/"+category+"/", (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${category}/${file}`);
        
        if(!props.info) props.info = {};
        props.help.kategorie = category;
        props.help.name = file.split(".")[0];
        
        bot.commands.set(file.split(".")[0], props);
        if(props.help.aliases) {
          props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props);
          });
        };
      });
    });
  });
});

// Andere Sachen, die ich auch global benutzen will
bot.statusChecker = (status) => {
  switch(status) {
    case "dnd":
      return "<:dnd:561580620870844417>"
      break;
    case "idle":
      return "<:afk:561580620816449538>"
      break;
    case "online":
      return "<:online:561580620585893920>"
      break;
    case "offline":
      return "<:off:561580620740952076>"
      break;
    default:
      return undefined;
      break;
    }
}
exports.getUser = () => {
  return bot.users.size
}
exports.getServer = () => {
 return bot.guilds.size 
}
exports.getChannels = () => {
 return bot.channels.size 
}
exports.getUptime = () => {
  if(!bot.uptime) return "0ms"
  return require('ms')(bot.uptime)
}
 exports.getBot = () => {
  return bot;
}

// Warum auch immer das hier existiert: 
// Das ist ein QuickEmbed, was du schnell irgendwo definieren kannst.

bot.quickEmbed = function(desc, color){
 
    const embed = new Discord.RichEmbed();
    embed.setDescription(desc)
    embed.setColor(color)
    embed.setTimestamp(new Date())
    
    return embed;
    
};

