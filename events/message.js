module.exports = (bot, message, Discord) => {
  const prefix = ","
  
  
   if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = bot.commands.get(command);
  
  if(!cmd) return;

    // NOTE: Logging
    console.log(`[CMD][${command.toUpperCase()}] ${message.author.username}: ${command} ${args.join(' ')}`);
    

  cmd.run(bot, message, args);
  
}

// Wer weiß was da los ist?
//A AAAAAAAAAAAAAAAAAA

