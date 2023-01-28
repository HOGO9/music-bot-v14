const Command = require('../../structures/Command')
const {  MessageEmbed } = require('discord.js')
const config = require('../../botconfig/principal.json')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: 'Makes the bot play a song on the channel you are on.',
            options: [
                {
                    name: 'title',
                    description: 'Music you want the bot to play.',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.voice.channel) return interaction.reply({ content: `You must be on a voice channel to use this command!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `You need to be on the same voice channel as me to use this command!`, ephemeral: true })

        const search = interaction.options.getString('title')

        await interaction.reply({ content: '[searching music](https://discord.gg/jujuba) ...', ephemeral: true})

        let res = await this.client.manager.search(search, interaction.user)

        if (!res?.tracks?.[0]) return interaction.editReply({ content: `no songs...`, ephemeral: true })

        const player = this.client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })

        if (player.state !== 'CONNECTED') player.connect()
        player.queue.add(res.tracks[0])

        if (!player.playing && !player.paused) player.play()

        interaction.editReply({ content: `Added to queue: ${res?.tracks?.[0]?.title}`, ephemeral: true})
    }
}
