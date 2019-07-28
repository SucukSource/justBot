exports.run = (bot, msg, args) => {
 const dc = require('discord.js')
 const request = require('request')
 const hum = require('humanize-number')
 if(!args[0]) return msg.channel.send(new dc.RichEmbed().setColor("0000FE").setTitle("Da fehlen ja Argumente!").setDescription("Bitte benutze `,joke bild` für ein Bild, oder `,joke text` für Text."))
 switch(args[0].toLowerCase()) {
   case "bild": 
     request({url:"https://paapi.glitch.me/joke/picture?key="+process.env.PAAPITOKEN,json:true}, (err, resp, body) => {
       if(err) return msg.channel.send("`Ein Fehler ist aufgetreten!`")
       if(body.error) return msg.channel.send("`Ein Fehler ist aufgetreten.`")
       msg.channel.send(new dc.RichEmbed()
        .setTitle("Ein Joke!")
        .setDescription("[Source des Bildes]("+body.source+")")
        .setImage(body.pic_url)
                       .setColor("FEFE88"))
       
     })
     break;
  case "text":
     request({url:"https://paapi.glitch.me/joke/text?key="+process.env.PAAPITOKEN,json:true}, (err, resp, body) => {
       if(err) return msg.channel.send("`Ein Fehler ist aufgetreten!`")
       if(body.error) return msg.channel.send("`Ein Fehler ist aufgetreten.`")
       msg.channel.send(body.text, {disableEveryone: true})
     });
     break;
   case "programming":
     var m; 
     msg.channel.send("Warte kurz..").then(msg=>m=msg);
     function search(){
     request("https://www.reddit.com/r/ProgrammerHumor/top.json?sort=top&t=day&limit=300",
      (err, resp, data) => {
        if(err) return m.edit(new dc.RichEmbed().setColor("0000FE").setTitle("Oh.").setDescription("Ein Fehler ist wohl aufgetreten. Meh, probier es später bitte wieder."));
       data = JSON.parse(data);
       var post = data.data.children[Math.floor(Math.random()*data.data.children.length-1)].data;
       console.log(post)
       if(!post.thumbnail) return search();
       m.edit(new dc.RichEmbed().setColor('RANDOM')
                       .setTitle(post.title)
                       .setDescription("⬆" + hum(parseInt(post.score)))
                       .setImage(post.thumbnail)
                       .setFooter("Von u/"+post.author+" | "+post.subreddit_name_prefixed))
      })
     }
     search();
     break;
  default:
    msg.channel.send(new dc.RichEmbed().setColor("0000FE").setTitle("Falsche Argumente!").setDescription("Bitte benutze einer der folgenden Optionen:"+
                                                                                                         "`,joke bild` für ein Bild,"+
                                                                                                         "`,joke text` für Text, oder"+
                                                                                                         "`,joke programming` für einen Programming-Joke."))
    break;
 }
  
}
exports.help = {
  name : "joke",
  description: "Zeigt Jokes an!",
  shown: true,
  kategorie: "fun"
};

