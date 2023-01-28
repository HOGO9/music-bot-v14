const { Manager } = require('erela.js')
const { MessageEmbed } = require('discord.js')
const config = require('../botconfig/principal.json')
//const Spotify  = require("erela.js-spotify");
const Deezer  = require("erela.js-deezer");
const AppleMusic  = require("erela.js-apple");
const Spotify = require('better-erela.js-spotify').default;
/*
new Spotify({
              clientID,
              clientSecret
            })
            */
module.exports = (client) => {
    return new Manager({
        plugins: [
            new Deezer(),
            new AppleMusic(),
            new Spotify()
          ],
        nodes: [
            {
      host: "nonssl.freelavalink.ga",
      port: 2000,
      pass: "www.freelavalink.ga",
      secure: false,
          }
        ],
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id)
            if (guild) guild.shard.send(payload)
        }
    })
        .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" conectado.`))
        .on("nodeError", (node, error) => console.log(
            `Node "${node.options.identifier}" encountered an error: ${error.message}.`
        ))
        .on("trackStart", (player, track) => {
            const channel = client.channels.cache.get(player.textChannel)
            channel.send({embeds: [
                new MessageEmbed()
                .setTitle('Now playing')
                .setDescription(`[${track.title}](${track.uri}) [<@${track.requester.id}>]`)
                .setColor(config.color)
            ]})
        })
        .on("queueEnd", player => {
            const channel = client.channels.cache.get(player.textChannel)
            channel.send({ embeds: [new MessageEmbed()
            .setDescription(`No songs...`)
        .setColor('RED')] })
            player.destroy()
        })
}
