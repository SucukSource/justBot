module.exports = (bot, error) => {
  console.log("[STATUS] Ein Fehler ist aufgetreten.\nNachricht: "+error.target.message+" \nDetails: ")
  console.log(error)
}