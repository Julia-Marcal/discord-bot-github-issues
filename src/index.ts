const { Client, Events, GatewayIntentBits, Collection, commands } = require('discord.js')
import { deploy_com } from './deploy-commands'
import dotenv from 'dotenv'

dotenv.config();

const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter((file:any) => file.endsWith(".ts"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
        console.log(command.data.name, command)
    } else  {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
    }
}

client.once(Events.ClientReady, (cli: any) => {
  console.log(`Ready! Logged in as ${cli.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN)

deploy_com()

client.on(Events.InteractionCreate, async (interaction: any) =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    }
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})

