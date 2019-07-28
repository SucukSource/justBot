exports.start = async () => {
  const main = require('../../main.js')
  const express = require('express');
  const hum = require('humanize-number')
  const app = express();
  const moment = require('moment')
  const fs = require('fs')
  moment.locale('de-at')

  app.use('/static', express.static('.media'))
  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render("index.pug", 
               { 
                user: hum(main.getUser()), 
                server: hum(main.getServer()),
                channel: hum(main.getChannels()),
                uptime: main.getUptime()
    })
  })
  app.get('/serverlist', async (req, res) => {
      var array = [];
  var i = 0;
  main.getBot().guilds.map(g => {
    array.push({ imgurl: g.iconURL, name: g.name });
    i++;
    if(i === main.getBot().guilds.size){
      console.log(moment(new Date()).format("HH:MM")+" Server-Liste wurde aufgerufen.")
      res.render("serverlist.pug", { servers: array });
    }
  })
    
    
  })
  
  app.get('/soon', (req, res) => res.render('soon.pug'))
  
  
  app.get('/stats', async (req, res) => {
    if(req.query.guild) {
      var g = main.getBot().guilds.get(req.query.guild);
      if(!g) res.render("stats.pug", { error: "Dieser Server wurde nicht gefunden." })
      
      var invite;
      await g.channels.first().createInvite({ maxAge: 60000, maxUses: 1, reason: "Für Stats-Website" })
      .then(inv=>invite=inv.url)
      .catch(()=>invite = "Konnte Invite nicht generieren");
      
      res.render("stats.pug",
                 { guild: {
                  name: g.name,
                   icon: g.iconURL,
                   channels: g.channels.size,
                   members: g.members.size,
                   invite: invite,
                   owner: g.owner,
                   erstellt: moment(g.createdAt).format('Do MMMM YYYY')
                 }
              
                  })
      
      return;
    }
     
    if(req.query.user) {
      var u = main.getBot().users.get(req.query.user);
      if(!u) res.render("stats.pug", { error: "Dieser User wurde nicht gefunden." })
      
      var data = {};
      
      data["name"] = u.tag;
      data["avatar"] = u.avatarURL;
      
      data["erstellt"] = moment(u.createdAt).format('Do MMMM YYYY')
      if(u.lastMessage) data["lastMsg"]=u.lastMessage.cleanContent;
      
      if(u.presence.game) data["game"]=u.presence.game;
      
      if(main.getBot().db.userGet(req.query.user, 'globalchat.mute'))
        data["globalchatmute"] = "Ja";
      else
        data["globalchatmute"] = "Nein";
      
      if(main.getBot().db.userGet(req.query.user, 'botbanned'))
        data["botbanned"] = "Ja";
      else
        data["botbanned"] = "Nein";
      
      
      
      res.render("stats.pug", {user:data})
      return;
      
   
    }
    
    res.render("stats.pug", 
                { gstats: {
                    uses: hum(main.getBot().db.getUses()),
                    server: hum(main.getServer()),
                    user: hum(main.getUser()),
                    channel: hum(main.getChannels()),
                    uptime: main.getUptime()
                  }
                }
               )
  })
  
  const listener = app.listen(process.env.PORT, () => {
    console.log('[MODUL] Webserver wurde gestartet.');
  });
  
  
  
  app.use(function(req, res) {
     res.status(404).render("404.pug", { url: req.originalUrl })
  });
};