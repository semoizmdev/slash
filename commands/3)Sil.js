const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"sil",
    description: 'Sohbet Yazılarını Siler!',
    type:1,
    options: [
        {
            name:"sayı",
            description:"Silmek İstediğiniz Yazı Miktarını Yazınız.",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) 
	return interaction.reply({content: "<:ac_uyar:1016373491475423283> Mesajları Yönet Yetkin Yok!", ephemeral: true})
    const sayi = interaction.options.getString('sayı')
    interaction.channel.bulkDelete(sayi)
	const embed = new EmbedBuilder()
	.setColor("Random")
	.setAuthor({name:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
	.setDescription(`> <:ahd_onay:1028279572787114026> **${sayi[0]}** *Adet Mesaj Silindi.*`)
	.setTimestamp()
	.setFooter({text:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
    interaction.reply({embeds: [embed], ephemeral: true })
}

};