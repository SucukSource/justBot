exports.toChannel = (guild, msg) => {
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync('/app/.secret/db.json')
  const db = low(adapter)
  var data = db.get('servers').find({ serverid: guild.id }).value()
  if(!data) return false;
  var channel = guild.channels.get(data.logchannel)
  if(!channel) return false;
  channel.send(msg)
  
}