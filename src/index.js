const { Intents } = require('discord.js')
const Client = require('./structures/Client')
const config = require('./botconfig/principal.json')
const client = new Client({
    intents: 32767
})

client.login(config.token)
