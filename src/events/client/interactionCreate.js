const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return;

            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) {
            try{
                cmd.run(interaction)
            } catch(err) {
                interaction.reply({ content: 'Erro ao executar o comando', ephemeral: true})
            }
            }

        }
    }
}