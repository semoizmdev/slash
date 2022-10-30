const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "yardım",
  description: "Botun yardım menüsüne bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
	.setColor("Random")
	.setAuthor({name: "ElevenBOT - Yardım Menüsü", iconURL:interaction.member.user.avatarURL({dynamic:true})})
	.setThumbnail('https://media.discordapp.net/attachments/947940390001057833/1031472213527908372/Bot_Avatar.png')
    .addFields({ name: '<:ac_moderator:1016373469912518678> Moderasyon', value: `**1** Adet Komut Mevcut`, inline: false})
	.addFields({ name: '<:ac_tamir:1016373487792828497> Ayarlanabilir', value: `**1** Adet Komut Mevcut`, inline: false})
	.addFields({ name: '<:ac_member:1016373468268347422> Kullanıcı', value: `**1** Adet Komut Mevcut`, inline: false})
	.addFields({ name: '<:ac_vip:1016373493006344222> Eğlence', value: `Henüz Yok`, inline: false})
	.addFields({ name: '<:ac_bots:1016373441038917712> ElevenBOT', value: `**3** Adet Komut Mevcut`, inline: false})
	.setTimestamp()
	.setFooter({text:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
    const row = new Discord.ActionRowBuilder()
    .addComponents(
	
new Discord.ButtonBuilder()
.setLabel("Moderasyon")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("moderasyon")
.setEmoji('1016373469912518678'),

new Discord.ButtonBuilder()
.setLabel("Ayarlanabilir")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("ayarlanabilir")
.setEmoji('1016373487792828497'),

new Discord.ButtonBuilder()
.setLabel("Kullanıcı")
.setStyle(Discord.ButtonStyle.Primary)
.setCustomId("kullanıcı")
.setEmoji('1016373468268347422')
.setDisabled(true),

new Discord.ButtonBuilder()
.setLabel("Eğlence")
.setStyle(Discord.ButtonStyle.Primary)
.setCustomId("eglence")
.setEmoji('1016373493006344222')
.setDisabled(true),

new Discord.ButtonBuilder()
.setLabel("ElevenBOT")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("elevenbot")
.setEmoji('1016373441038917712')
.setDisabled(true),
)

interaction.reply({embeds: [embed], components: [row], ephemeral: true})
  }

};