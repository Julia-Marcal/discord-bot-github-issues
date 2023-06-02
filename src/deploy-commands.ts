const { REST, Routes } = require("discord.js")

const dotenv = require('dotenv')
dotenv.config()

const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith(".ts"))

const commands:any = []

for (const file of commandFiles) {
   const command = require(`./commands/${file}`)
   commands.push(command.data.toJSON())
}

export const deploy_com = async () =>{
  const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

  try {
    const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        {body: commands}
      )
    } catch (error){
        console.error(error)
    }
}


