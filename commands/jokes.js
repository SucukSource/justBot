exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const jokes = ["",
   "https://preview.redd.it/wphqigm6ah121.jpg?width=640&crop=smart&auto=webp&s=7e9bb468efc9fcc283c459101c5dae79d030021f",
   "https://cdn.discordapp.com/attachments/518484140450906113/518484217135366169/patrickmeme_1.png",
   "https://preview.redd.it/wg165u0tqo121.jpg?width=640&crop=smart&auto=webp&s=b6d1276d237577a5809789cc404e917803e075e2",
   "https://cdn.discordapp.com/attachments/518548942888239149/518549026208088116/36f5d8c.jpg",
   "https://cdn.discordapp.com/attachments/518548942888239149/518549025230684181/ee74b53.png",
   "https://cdn.discordapp.com/attachments/518548942888239149/518549024635224074/93d1f85.jpg",
   "https://cdn.discordapp.com/attachments/518548942888239149/518549025717485585/5e0aff8.jpg",
   "https://cdn.discordapp.com/attachments/518409875827458058/518462605262585859/unknown.png",
   "https://cdn.discordapp.com/attachments/518360515743973385/518807966779047983/unknown.png",
   "https://cdn.discordapp.com/attachments/518548942888239149/518822044973137921/patrickmemes2.png"
   ]
 
 const index = Math.floor(Math.random() * (jokes.length - 1) + 1);
 
  msg.channel.send(new dc.RichEmbed()
                   .setTitle("Joke.")
                   .setImage(jokes[index])
                   .setFooter("Dies ist dein Bild, und du willst es nicht hier haben? Schreibe bitte @Patrick#5466 an."))
  
  
}
exports.help = {
  name : "joke",
  description: "Zeigt Jokes an! (Gestohlen von [SmileBot](https://discord.gg/jTUzuPd))",
  shown: true
};

