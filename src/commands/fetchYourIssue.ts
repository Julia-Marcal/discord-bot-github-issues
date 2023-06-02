import { SlashCommandBuilder } from '../services/SlashCommandBuilder'
import { convertToAPIEndpoint } from '../services/fixingURLforApi'

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get-issues")
        .setDescription("Will get all the current open issues of your project")
        .addStringOption(option =>
          option.setName('url')
            .setDescription('Url to fetch the issues')
            .setRequired(true)
        ),


    async execute(interaction: any) {
      const repositoryUrl = interaction.options.get('url');
      const apiEndpoint = convertToAPIEndpoint(repositoryUrl);

      if (apiEndpoint) {
          await interaction.reply(`API Endpoint: ${apiEndpoint}`);
      } else {
          await interaction.reply('Invalid repository URL provided.');
      }
    }
};
