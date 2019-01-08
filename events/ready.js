module.exports = (bot) => {
    bot.activity_list = [
    `auf {bot.guilds.size} Server`,
    `${bot.users.size} User an`,
    `in ${bot.channels.size} Kanäle`,
    `seit 2018`
    ]
    bot.user.setPresence({ game: { 
                                type: 'WATCHING', 
                                name: "nichts"+` | ,help` }, 
                        status: 'idle' })
  
  setInterval(() => {
        const index = Math.floor(Math.random() * (bot.activity_list.length - 1) + 1);
    bot.user.setPresence({ game: { 
                                type: 'WATCHING', 
                                name: bot.activity_list[index]+` | ,help` }, 
                        status: 'idle' })
    }, 30000);
  
  console.log("---- Bot on")
  
}
