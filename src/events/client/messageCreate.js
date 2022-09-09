const Event = require('../../structures/Event')
const config = require('../../botconfig/principal.json')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message) => {
        const returna = config.mention_return.message
        .replace("{user}", `<@${message.author.id}>`)

        if(config.mention_return.status === true) {
            if(message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) {
                message.reply({ content: `${returna}`}).then((msg) => {
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                        message.delete().catch(err => {})
                    }, 7000)
                }).catch(err => {})
            }
        }
    }
}