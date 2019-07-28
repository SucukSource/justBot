var dc = require('discord.js')
var servers = {};
const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(process.env.YT_TOKEN);

function play(connection, msg, bot) {
	var server = servers[msg.guild.id];
	if (!connection) return;
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {
		filter: 'audioonly'
	}))
	server.queue.shift();
	server.dispatcher.on('end', function(reason) {
		setTimeout(async () => {
			server.songTitles.shift();
			if (!server.queue[0]) return connection.disconnect();
			let info = await ytdl.getInfo(server.queue[0]);
			if (server.queue[0]) {
				play(connection, msg, bot)
				msg.channel.send(new dc.RichEmbed()
					.setColor(102, 0, 255)
					.addField('Video', info.title, false)
					.addField('Kanal', info.author.name, true)

					.setThumbnail(info.author.avatar)
					.setImage(info.thumbnail_url))
			} else connection.disconnect();
		}, 2000)
	})
}
exports.run = async (bot, msg, args) => {
	const dis = require("discord.js")
	const playembed = new dis.RichEmbed();
	let connection = undefined;

	var url = args[0];
	if (!args[0])
		return msg.channel.send(new dis.RichEmbed()
			.setColor("47290")
			.setDescription(`Ohne Link oder Suchbegriff kann ich schwer was abspielen.`))

	if (!msg.member.voiceChannel)
		return msg.channel.send(new dis.RichEmbed()
			.setColor("47290")
			.setDescription(`Du bist in keinem Voice-Channel! Gehe bitte zuerst in einen.`))

	if (msg.guild.me.voiceChannel && msg.guild.me.voiceChannelID !== msg.member.voiceChannelID)
		return msg.channel.send(new dis.RichEmbed()
			.setColor("47290")
			.setDescription(`Hey! Du bist nicht da wo ich bin! Fang mich zuerst!`))

	if (!msg.guild.me.voiceChannel)
		try {
			connection = await msg.member.voiceChannel.join()
		} catch (err) {
			return msg.channel.send(new dis.RichEmbed()
				.setColor("47920")
				.setTitle("Nur noch ein Problemchen..")
				.setDescription("Ich kann nicht in deinen Channel joinen. Gebe mir dafür die richtigen Rechte."))
		}


	let validate = await ytdl.validateURL(args[0]);
	var sent = await msg.channel.send(new dis.RichEmbed()
		.setColor("47920")
		.setDescription("Warte kurz..")).then(s => sent = s);
	if (!validate) {
		const video = await youtube.searchVideos(args.join(' '))
			.catch((err) => {
				return msg.channel.send(new dis.RichEmbed()
					.setColor("47290")
					.setDescription(`Ich konnte kein Video namens \`${args.join(' ')}\` finden.`))
			})
		url = video.url
	}

  if(!url) return;
	let info = await ytdl.getInfo(url).catch(e => sent.edit("Oh, oh. Ein Fehler ist aufgetreten.\n\n"+e));
	// queue
	if (!servers[msg.guild.id]) servers[msg.guild.id] = {
		queue: [],
		songTitles: [],
		votes: 0,
		voter: []
	};
	var server = servers[msg.guild.id];
	server.queue.push(url)
	server.songTitles.push(info.title)

	sent.edit(new dis.RichEmbed()
		.setColor(102, 0, 255)
		.setTitle("Zur Queue hinzugefügt")
		.addField('Video', info.title, false)
		.addField('Kanal', info.author.name, true)

		.setThumbnail(info.author.avatar)
		.setImage(info.thumbnail_url));


	play(connection, msg, bot, info)




};

exports.help = {
	description: "Spielt Musik ab",
	shown: true
};

exports.getServers = () => {
  return servers;
}