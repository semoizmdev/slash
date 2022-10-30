const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"Avatar",
    description: 'Birinin Avatarına Bakarsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Avatarına Bakmak İstediğin Kullanıcıyı Etiketle!",
            type:6,
            required:true
        },
      
    ],
  run: async(client, interaction) => {

    const user = interaction.options.getMember('user')
   
    const embed = new EmbedBuilder()
	.setColor("Random")
	.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
	.setTimestamp()
	interaction.reply({embeds: [embed], ephemeral: true })
	}

};