const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

var express = require('express')
var app = express()

bot.version = "1.1"
bot.settings = require('./einstellungen.json');
bot.logger = require('./modules/logger.js')

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`[CMD][LOAD] ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    bot.commands.set(props.help.name, props);
  });
});

bot.quickEmbed = function(desc, color){
 
  const embed = new Discord.RichEmbed();
  embed.setDescription(desc)
  embed.setColor(color)
  embed.setTimestamp(new Date())
  
  return embed;
  
}




bot.login(process.env.TOKEN);



app.get('/', function (req, res) {
  var jokelist = [
    "It works? Don't touch it.",
    "$ life<br>life: not found",
    '<img src="https://i.redd.it/uz19pcf5nk021.png">',
    '<img src="https://i.redd.it/d9ko19a7sk021.png">',
    "$ show scriptThatIJustWrote<br>Couldn't find the script that you just wrote.<br><br>$"
                ]
  
  res.send(jokelist[Math.floor(Math.random()*jokelist.length)])
})

app.listen(process.env.PORT)


bot.statusChecker = (status) => {
  switch(status) {
    case "dnd":
      return "<:dnd:526788572796420096>"
      break;
    case "idle":
      return "<:afk:526788571785330688>"
      break;
    case "online":
      return "<:online:526788572238577667>"
      break;
    case "offline":
      return "<:offline:526788568853774359>"
      break;
      
               }
}

// database stuff
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('.secret/db.json')
const db = low(adapter)

db.defaults({ servers:[]}).write();