import { SlashCommandBuilder } from '../services/SlashCommandBuilder'

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com 'Pong!"),

    async execute(interaction: any) {
        await interaction.reply("Pong!")
    }
}
