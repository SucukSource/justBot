const hum = require('humanize-number')
module.exports = (bot) => {

      
      bot.user.setPresence({ game: { 
                                  type: 'WATCHING', 
                                  name: "mir beim Restarten zu.."}, 
                          status: 'idle' })
    
    setInterval(() => {
      if(bot.settings.maintenance)     
        return bot.user.setPresence({ 
            game: { 
                name: `Maintenance` 
            }, 
            status: 'dnd' 
        });

      setPresence(bot);
      }, 30000);
    
    console.log("[STATUS] Eingeloggt. Ich bin bereit für Befehle!")
    
  }
  
  function setPresence(bot) {
    const index = Math.floor(Math.random() * (bot.settings.spielt.length - 1) + 1);
    const type = bot.settings.spielt[index].split("|||")[1]
    const game = bot.settings.spielt[index].split("|||")[0].replace('$USER', hum(bot.users.size)).replace('$SERVER', hum(bot.guilds.size)).replace('$CHANNEL', hum(bot.channels.size))
    console.log("[INFO] Status geändert: "+type.toLowerCase()+" "+game+` | ,help`)  
    bot.user.setPresence({ 
          game: { 
              type: type, 
              name: game+` | ,help` }, 
          status: 'idle'  
        })
  }