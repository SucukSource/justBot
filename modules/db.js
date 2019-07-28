const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('/app/.secret/db.json')
const db = low(adapter)
const settings = require('../einstellungen')

/*
      GENERAL-STUFF
*/
exports.getDB = () => {
  return db;
}

db.defaults(
  { 
    servers: [], 
    user: [], 
    usedcount: 0
  }).write(); // Setzt Defaults
 
/*                 
      SERVER-STUFF
*/
  
exports.createServer = (id) => {
  db.get('servers').push({ serverid: id }).write()
}
exports.deleteServer = (id) => {
  db.get('user').remove({ id: id }).write();
}
exports.doesServerExist = (id) => {
  if(db.get('servers')
     .find({ serverid: id })
     .value() === undefined) return false;
  return true;
}
exports.noServerCreate = (id) => {
  if(!this.doesServerExist(id)) this.createServer(id);
}
exports.serverSet = (id, entry, value) => {
  this.noServerCreate(id);
  db.get('servers')
  .find({ serverid: id })
  .set(entry, value)
  .write();
}
exports.serverUnset = (id, entry) => {
  this.noServerCreate(id);
  db.get('servers')
  .find({ serverid: id })
  .unset(entry)
  .write();
}
exports.serverGet = (id, entry) => {
  return db.get('servers')
  .find({serverid: id})
  .get(entry)
  .value();
}

/*
      USER-STUFF
*/
exports.doesUserExist = (id) => {
  if(db.get('user')
     .find({ id: id })
     .value() === undefined) return false;
  return true;
}
exports.noUserCreate = (id) => {
  if(!this.doesUserExist(id)) this.createUser(id);
}
exports.createUser = (id) => {
  db.get('user').push({ id: id, coins: {amount: settings.economy.startcoins } }).write();
}
exports.deleteUser = (id) => {
  db.get('user').remove({ id: id }).write();
}
exports.userSet = (id, entry, value) => {
  this.noUserCreate(id);
  db.get('user')
  .find({ id: id })
  .set(entry, value)
  .write();
}
exports.userUnset = (id, entry) => {
  this.noUserCreate(id);
  db.get('user')
  .find({ id: id })
  .unset(entry)
  .write();
}
exports.userGet = (id, entry) => {
  return db.get('user')
  .find({id: id})
  .get(entry)
  .value();
}

/*
      CHANNEL-STUFF
*/
exports.toLogChannel = (guild, msg) => {
  var channel = guild.channels.get(
  exports.serverGet(guild.id, "logchannel"))
  if(!channel) return;
  channel.send(msg)
}



/*
  ANDERES
*/
exports.addUse = () => {
  db.update("usedcount", n=>n+1).write();
};
exports.getUses = () => {
  return db.get('usedcount').value();
};

/*
  COIN SYSTEM!
*/

exports.addCoins = (id, count) => {
  if(!this.getCoins()) this.userSet('coins.amount', 0);
  db.get('user').find({ id: id }).update('coins.amount', n=>n+count).write();
};

exports.removeCoins = (id, count) => {
  db.get('user').find({ id: id }).update('coins.amount', n=>n-count).write(); 
};

exports.getCoins = (id) => {
  return this.userGet(id, "coins.amount") 
};