const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')
const config = require('../../botconfig/principal.json')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            description: 'Show the music queue playing now.'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: 'I\'m not playing any music on this server.', ephemeral: true })

        const queue = player.queue

        const embed = new MessageEmbed()
            .setTitle(`Queue`)
            .setColor(config.color)

        const tracks = queue.slice(0, 10)

        if (queue.current) embed.addFields({ name: `Now playing`, value: `[${queue.current.title}](${queue.current.uri})`})
        if (!tracks.length) embed.setDescription(`There is no song in the queue.`)
        else embed.setDescription(
            tracks.map((t, i) => {
                return `${i + 1} - [${t.title}](${t.uri})`
            })
            .join('\n')
        )

        interaction.reply({ embeds: [embed] })
    }
}