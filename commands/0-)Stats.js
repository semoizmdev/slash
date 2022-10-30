const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");
  const os = require("os");
module.exports = {
  name: "istatistik",
  description: "Botun İstatistiğini Gösterir!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new EmbedBuilder()
	.setColor("Random")
    .setAuthor({name:interaction.client.user.tag,iconURL:interaction.member.user.avatarURL({dynamic:true})})
	.setThumbnail('https://media.discordapp.net/attachments/947940390001057833/1031472213527908372/Bot_Avatar.png')
    .addFields({ name: '<:ac_owner:1016373475272831227> Bot Sahibi', value: `Kadrxy#0001`, inline: false})
	.addFields({ name: '<:ac_developer:1016373444285308970> Developer', value: `Kadrxy#0001, Umut#6070`, inline: false})
    .addFields({ name: '<:ac_tester:1016373489281802342> Bellek Kullanımı', value: `${(process.memoryUsage().heapUsed /1024 /512).toFixed(2)}MB`, inline: true})
    .addFields({ name: '<:ac_live:1016373460756336700> Çalışma Süresi', value: `${Uptime}`, inline: true})
    .addFields({ name: '<:ac_member:1016373468268347422> Aktif Kullanıcı', value: `${client.users.cache.size}`, inline: false})
    .addFields({ name: '<:ac_member:1016373468268347422> Toplam Kullanıcı', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, inline: false})	
    .addFields({ name: '<:ac_home:1021020737735229440> Sunucular', value: `${client.guilds.cache.size}`, inline: true})
    .addFields({ name: '<:ahd_metin:1031445560693112882> Kanallar', value: `${client.channels.cache.size}`, inline: true})
    .addFields({ name: '<:ahd_support:1028279587584626688> İşletim Sistemi', value: `Windows 11 Pro 64 Bit`, inline: false})
    .addFields({ name: '<:ahd_support:1028279587584626688> İşlemci', value: `${os.cpus().map(i => `${i.model}`)[0]}`, inline: false})
    .addFields({ name: '<:ahd_wumpus:1031445554871402526>  Discord.JS sürüm', value: `14.3.0`, inline: true})
    .addFields({ name: '<:ahd_wumpus:1031445554871402526>  Node.JS sürüm', value: `v16.14.2`, inline: true})
    .addFields({ name: '<:ahd_bots:1028279536145682453> Bot Kuruluş', value: `26.02.2022`, inline: false})
    .addFields({ name: '<:ahd_code:1031445556972769280> Komut Sayısı', value: `6`, inline: true})
    .addFields({ name: '<:ahd_download:1028279542697181245> Ping', value: `${client.ws.ping}`, inline: true})
	.setTimestamp()
	.setFooter({text:interaction.client.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
    interaction.reply({embeds: [embed], ephemeral: true })

  }

};