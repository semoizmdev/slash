const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const kadrxydb = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);


// DURUM KISMI

client.on("ready",async () => {
	
 setInterval(() => {
    let mesajlar = [
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Üye | ${client.guilds.cache.size} Sunucu`
    ];

    const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];

     client.user.setActivity(mesaj)
	 client.user.setStatus("idle")

  }, 30000);   //1000= 1 saniye - 15000=15 saniye


      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Aktif Kullanıcı    : ${client.users.cache.size}`);
	  console.log (`Toplam Kullanıcı   : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`);
      console.log (`Durum              : Bot Aktif`);
	  console.log (`Sahip              : Kadrxy#0001 | Kadrxy`);
      console.log ('_________________________________________');
    
    });

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
const botlist = require("./commands/1-)BotList");
const { Modal } = require("discord-modals");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });


});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
});


client.login(TOKEN)


//YARDIM MENUSU

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)  
  if(interaction.customId == "moderasyon") 
//Moderasyon
  {
const embed = new Discord.EmbedBuilder()
	.setColor("Random")
	.setAuthor({name: "Moderasyon - Yardım Menüsü", iconURL:interaction.member.user.avatarURL({dynamic:true})})
	.setThumbnail('https://media.discordapp.net/attachments/947940390001057833/1031472213527908372/Bot_Avatar.png')
    .addFields({ name: '``/sil``', value: 'Sohbet Yazılarını Siler.', inline: false})
	.setTimestamp()
	.setFooter({text:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
//Ayarlanabilir
  if(interaction.customId == "ayarlanabilir") {
    const embed = new Discord.EmbedBuilder()
	.setColor("Random")
	.setAuthor({name: "Ayarlanabilir - Yardım Menüsü", iconURL:interaction.member.user.avatarURL({dynamic:true})})
	.setThumbnail('https://media.discordapp.net/attachments/947940390001057833/1031472213527908372/Bot_Avatar.png')
    .addFields({ name: '``/botlist-ayarla``', value: 'Botlist Sistemini Kurar.', inline: false})
	.setTimestamp()
	.setFooter({text:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
})


//BOTLIST

const lourityModal = new ModalBuilder()
    .setCustomId('form')
    .setTitle('Botlist Bot Başvuru Formu')
const a1 = new TextInputBuilder()
    .setCustomId('id')
    .setLabel('Bot ID Yazınız')
    .setStyle(TextInputStyle.Short)
    .setMinLength(15)
    .setMaxLength(25)
    .setPlaceholder('Botunun ID (Kimliği) nedir?')
    .setRequired(true)
const a2 = new TextInputBuilder()
    .setCustomId('prefix')
    .setLabel('Bot Prefixini Yazınız')
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(4)
    .setPlaceholder('Botunun Prefixi (Ön Ek) nedir?')
    .setRequired(true)

const row = new ActionRowBuilder().addComponents(a1);
const row3 = new ActionRowBuilder().addComponents(a2);
lourityModal.addComponents(row, row3);


client.on('interactionCreate', async (interaction) => {


    if (interaction.commandName === "bot-ekle") {

        const zatenEklenmis = new EmbedBuilder()
            .setTitle("Başarısız!")
            .setDescription("Zaten eklenmiş olan bir botun var!")
            .setColor("Red")
        let varmi = kadrxydb.get(`ekledi_${interaction.user.id}`)
        if (varmi) return interaction.reply({ embeds: [zatenEklenmis], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'form') {

        onay = kadrxydb.get(`onay_${interaction.guild.id}`)
        logg = kadrxydb.get(`log_${interaction.guild.id}`)
        botRol = kadrxydb.get(`botRol_${interaction.guild.id}`)
        devRol = kadrxydb.get(`devRol_${interaction.guild.id}`)
        botekle = kadrxydb.get(`botekle_${interaction.guild.id}`)
        ayrildiLog = kadrxydb.get(`ayrildiLog_${interaction.guild.id}`)
		adminRol = kadrxydb.get(`adminRol_${interaction.guild.id}`)


        if (!onay) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!logg) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!botRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!devRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!adminRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!botekle) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!ayrildiLog) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })

        const Discord = require("discord.js")
        const id = interaction.fields.getTextInputValue("id")
        const prefix = interaction.fields.getTextInputValue('prefix')
        const sahip = (`<@${interaction.user.id}>`)

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Botu Ekle")
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL("https://discord.com/oauth2/authorize?client_id=" + id + "&scope=bot&permissions=0"),
                new Discord.ButtonBuilder()
                    .setLabel("Onayla")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setCustomId("onayla"),
                new Discord.ButtonBuilder()
                    .setLabel("Reddet")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("reddet")
            )

        adminRol = kadrxydb.get(`adminRol_${interaction.guild.id}`)
        let a = await client.users.fetch(id);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".png?size=1024"

        const gonderildi = new EmbedBuilder()
            .setTitle("Başarılı!")
			.setAuthor({ name:interaction.member.user.tag, iconURL:interaction.member.user.avatarURL({dynamic:true})})
            .setDescription("Bot başvurun başarıyla yetkililere gönderildi!")
            .setColor("Green")
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });

        const embed = new EmbedBuilder()
            .setTitle("Sıraya Yeni Bot Eklendi!")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("Bot Sahibi: " + sahip + "\n\n**İD:** ```" + id + "``` **Prefix:** ```" + prefix + "```")
            .setColor("Yellow")
            .setThumbnail(link)
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });
        let log = kadrxydb.get(`onay_${interaction.guild.id}`)

        client.channels.cache.get(log).send({ content: "<@&" + adminRol + ">", embeds: [embed], components: [row] }).then((mesaj) => {
            interaction.reply({ embeds: [gonderildi], ephemeral: true })
            kadrxydb.set(`bot_${mesaj.id}`, { user: interaction.user.id, bot: id })
            kadrxydb.set(`ekledi_${interaction.user.id}`, id)
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "reddet") {

        let message = await interaction.channel.messages.fetch(interaction.message.id)
        let log = kadrxydb.get(`log_${interaction.guild.id}`)
        var data = kadrxydb.fetch(`bot_${interaction.message.id}`)
        var uye = data.user
        var bot = data.bot

        let admin = kadrxydb.get(`adminRol_${interaction.guild.id}`)

        if (!interaction.member.roles.cache.has(admin)) return interaction.reply({ content: "Bu işlemi gerçekleştirmek için <@&" + admin + "> rolüne sahip olmalısın!", ephemeral: true })

        let a = await client.users.fetch(bot);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + bot + "/" + avatar + ".png?size=1024"

        const embed = new EmbedBuilder()
            .setTitle("Bot Reddedildi!")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("> <:dt_bots:1009523218647875654> <@" + data.bot + "> **Adlı botun başvurusu maalesef reddedildi!**")
            .setThumbnail(link)
            .setColor("Red")
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });

        client.channels.cache.get(log).send({ content: "<@" + uye + ">", embeds: [embed] })
        message.delete()
    }

    if (interaction.customId === "onayla") {

        let admin = kadrxydb.get(`adminRol_${interaction.guild.id}`)

        if (!interaction.member.roles.cache.has(admin)) return interaction.reply({ content: "Bu işlemi gerçekleştirmek için <@&" + admin + "> rolüne sahip olmalısın!", ephemeral: true })

        let message = await interaction.channel.messages.fetch(interaction.message.id)
        let log = kadrxydb.get(`log_${interaction.guild.id}`)
        let dev = kadrxydb.get(`devRol_${interaction.guild.id}`)
        let botrol = kadrxydb.get(`botRol_${interaction.guild.id}`)
        var data = kadrxydb.fetch(`bot_${interaction.message.id}`)
        var uye = data.user
        var bot = data.bot
        let a = await client.users.fetch(bot);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + bot + "/" + avatar + ".png?size=1024"

        let eklendimi = interaction.guild.members.cache.get(bot)
        const hata = new EmbedBuilder()
            .setTitle("Başarısız!")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("Önce botu sunucuya eklemelisin!")
            .setColor("Red")
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });
        if (!eklendimi) return interaction.reply({ embeds: [hata], ephemeral: true })

        const embed = new EmbedBuilder()
            .setTitle("Bot Onaylandı!")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("> <:dt_bots:1009523218647875654> <@" + data.bot + "> **Adlı botun başvurusu kabul edildi!**")
            .setThumbnail(link)
            .setColor("Green")
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });
        client.channels.cache.get(log).send({ content: "<@" + uye + ">", embeds: [embed] })
        interaction.guild.members.cache.get(uye).roles.add(dev).catch(err => { })
        interaction.guild.members.cache.get(bot).roles.add(botrol).catch(err => { })
        message.delete()
    }
})

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === "botlist-ayarla") {

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

        let botekle = kadrxydb.get(`botekle_${interaction.guild.id}`)

        const menu = new Discord.EmbedBuilder()
            .setColor("Random")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("> **Botumu Nasıl Eklerim?** \n > *Butona Basarak Gereken Yerleri Doldurarak Botunuzu Ekleyebilirsiniz.*")
	        .setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });

        const row1 = new Discord.ActionRowBuilder()

            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("\<:dt_bots:1009523218647875654>")
                    .setLabel("Bot ekle | Add bot")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("bot-ekle")
            )

        client.channels.cache.get(botekle).send({ embeds: [menu], components: [row1] })
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "bot-ekle") {
        await interaction.showModal(lourityModal);
    }
})

// BOTLIST - Sistemi Sıfırla - Button
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "kapat") {
        const yetkii = new Discord.EmbedBuilder()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setColor("Red")

        const embed1 = new Discord.EmbedBuilder()
            .setTitle("Başarıyla Sıfırlandı!")
            .setDescription("> Botlist sistemi başarıyla **sıfırlandı**!")
            .setColor("Green")

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [yetkii], ephemeral: true })

        kadrxydb.delete(`log_${interaction.guild.id}`)
        kadrxydb.delete(`botRol_${interaction.guild.id}`)
        kadrxydb.delete(`devRol_${interaction.guild.id}`)
        kadrxydb.delete(`adminRol_${interaction.guild.id}`)
        kadrxydb.delete(`onay_${interaction.guild.id}`)
        kadrxydb.delete(`botekle_${interaction.guild.id}`)
        kadrxydb.delete(`ayrildiLog_${interaction.guild.id}`)
        return interaction.reply({ embeds: [embed1], ephemeral: true })
    }
})

const unban = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setEmoji("🔓")
            .setLabel("Banı Kaldır")
            .setStyle(Discord.ButtonStyle.Danger)
            .setCustomId("unban")
    )

client.on('guildMemberRemove', async member => {

    let ayrildiLog = kadrxydb.get(`ayrildiLog_${member.guild.id}`)

    var data = kadrxydb.fetch(`ekledi_${member.id}`)
    if (!data) return;

    let lourityData = data

    const lourityBanEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Banlandı!")
		.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
        .setDescription("> <:dt_bots:1009523218647875654> <@" + member.id + ">, **Sunucudan ayrıldığı için botunu sunucudan banladım!**")
		.setTimestamp()
	    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });

    member.guild.members.ban(lourityData).catch(() => { })
    member.guild.channels.cache.get(ayrildiLog).send({ embeds: [lourityBanEmbed], components: [unban] }).then(mesaj => {
        kadrxydb.set(`user_${mesaj.id}`, member.id)
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "unban") {
        let message = await interaction.channel.messages.fetch(interaction.message.id)
        var user = kadrxydb.fetch(`user_${interaction.message.id}`)
        var data = kadrxydb.fetch(`ekledi_${user}`)

        let lourityData = data

        const yetkiii = new Discord.EmbedBuilder()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setColor("Red")

        const embed1 = new Discord.EmbedBuilder()
            .setTitle("Başarılı!")
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setDescription("> **Botun banı başarıyla kaldırıldı!**")
            .setColor("Green")
			.setTimestamp()
	        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) });

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [yetkiii], ephemeral: true });

        if (!lourityData) return interaction.reply({ content: "Bu botun banı zaten kaldırılmış!", ephemeral: true })

        interaction.guild.members.unban(lourityData).catch(() => { })
        message.delete()
        return interaction.reply({ embeds: [embed1], ephemeral: true })
    }

})

// BOTLIST - Ayarlar Button 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "ayarlar") {
        let log = kadrxydb.get(`log_${interaction.guild.id}`)
        let onayKanal = kadrxydb.get(`onay_${interaction.guild.id}`)
        let botEkle = kadrxydb.get(`botekle_${interaction.guild.id}`)
        let ayrildiLog = kadrxydb.get(`ayrildiLog_${interaction.guild.id}`)
        let botRol = kadrxydb.get(`botRol_${interaction.guild.id}`)
        let devRol = kadrxydb.get(`devRol_${interaction.guild.id}`)
        let adminRol = kadrxydb.get(`adminRol_${interaction.guild.id}`)

        const mesaj = new Discord.EmbedBuilder()
            .setTitle("Botlist Sistem Ayarları")
            .addFields(
                { name: "**💾 Log Kanalı**", value: `<#${log || "Ayarlanmamış!"}>`, inline: true },
                { name: "**👍 Onay Kanalı**", value: `<#${onayKanal || "Ayarlanmamış!"}>`, inline: true },
                { name: "**🎈 Bot Ekle Kanalı**", value: `<#${botEkle || "Ayarlanmamış!"}>`, inline: true },
                { name: "**📤 Ayrıldı Log Kanalı**", value: `<#${ayrildiLog || "Ayarlanmamış!"}>`, inline: true },
                { name: "**🤖 Bot Rolü**", value: `<@&${botRol || "Ayarlanmamış!"}>`, inline: true },
                { name: "**👨‍💻 Developer Rolü**", value: `<@&${devRol || "Ayarlanmamış!"}>`, inline: true },
                { name: "**🔨 Yetkili Rolü**", value: `<@&${adminRol || "Ayarlanmamış!"}>` }
            )
            .setColor("Yellow")

        const yetki = new Discord.EmbedBuilder()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
            .setColor("Red")
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [yetki], ephemeral: true });

        interaction.reply({ embeds: [mesaj], ephemeral: true })
    }
})

