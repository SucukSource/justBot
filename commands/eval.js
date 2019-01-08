exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const errorembed = new dc.RichEmbed().setColor(153, 0, 0).setFooter("Du denkst dies ist ein Fehler? Bitte kontaktiere @Patrick#5466.")
  if(!isInArray(msg.author.id, bot.settings.teammitglieder)){
    errorembed.setTitle("So läuft der Hase nicht!").setDescription("Du musst ein Teammitglied von diesem Bot sein, damit du diesen Befehl ausführen kannst.")
    return msg.channel.send(errorembed)
  }
  
    const output = eval(args.join(' '))
  
  msg.channel.send("Schatz, dein Ergebnis ist da!\nEs ist: `"+output+"\n`")
  
}
exports.help = {
  name : "eval",
  description: "Lässt dich Code ausführen.",
  shown: false
};

const personen = require('./personen.json')
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

const patrick = [
  ]
const dayly = []
patrick.stinkt = false
patrick.alter = -149
dayly.stinkt = true
dayly.alter = 14
dayly.lieblingssong = "https://www.youtube.com/watch?v=60ItHLz5WEA (Alan Walker - Faded)"

// stackoverflow ist nett und lässt mich kopieren
// also lasse ich es von mir kopieren xd