const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "Ping",
  description: "Botun Pingini Görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const { user, guildId, channel } = interaction;


    interaction.reply({ embeds: [ new EmbedBuilder().setDescription(`<a:ac_loading:1014974134800875521> Pong! ***${client.ws.ping}ms***`).setColor("Random") .setTimestamp()], ephemeral: true })

  }

};