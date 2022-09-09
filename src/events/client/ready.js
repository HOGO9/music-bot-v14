const Event = require('../../structures/Event')
const config = require('../../botconfig/principal.json')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        this.client.registryCommands()
        this.client.manager.init(this.client.user.id)
        this.client.user.setStatus("online")
        this.client.user.setActivity(config.status, { type: "LISTENING"}) 
        console.log('bot online')

        setInterval(() => {
            this.client.guilds.cache.forEach((guild) => {
                this.client.user.setActivity(`${config.status}`, { type: "PLAYING"}) 
            })
        }, 20 * 60000)
    }
}