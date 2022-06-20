const {Client, Intents} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const WOKCommands = require('wokcommands')
const path = require('path')
require('dotenv').config()
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')


client.on('ready', () => {
 console.log(`${client.user.tag} Tớ Đây!`)
})
client.on('ready', async () =>{
    new WOKCommands(client, {
        commandsDir: path.join(__dirname,'commands')
    })
})
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const rest = new REST({version: '9'}).setToken(process.env.TOKEN)
rest.get(Routes.applicationGuildCommands(clientId,guildId))
.then(data => {
    const promises = []
    for(const command of data) {
        const deleteUrl = `${Routes.applicationGuildCommands(clientId,guildId)}/${command.id}`
        promises.push(rest.delete(deleteUrl))
    }
    return Promise.all(promises)
})
client.login(process.env.TOKEN)