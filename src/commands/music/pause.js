const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')
const config = require('../../botconfig/principal.json')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            description: 'Pause the current song'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: 'I\'m not playing any music on this server.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: 'You must be on a voice channel to use this command.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: 'You need to be on the same voice channel as me.', ephemeral: true })

        if (player.paused) return interaction.reply({ content: 'The music is already paused!', ephemeral: true })

        player.pause(true)
        interaction.reply({embeds: [new MessageEmbed().setDescription('music paused').setColor(config.color)] })
    }
}