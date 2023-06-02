import { SlashCommandBuilder } from '../services/SlashCommandBuilder'
import { convertToAPIEndpoint } from '../services/fixingURLforApi'
import { fetchData } from '../controller/get/fetchIssues'

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
      const repositoryUrl = interaction.options.get('url').value;
      const apiEndpoint = convertToAPIEndpoint(String(repositoryUrl));

      if (apiEndpoint) {
          const fetchedData = await fetchData(apiEndpoint)
          const openIssues = fetchedData.filter((issue: any) => issue.state === 'open'  && !issue.pull_request);
          const filteredIssues = openIssues.map((issue: any) => {
            return {
              title: issue.title,
              html_url: issue.html_url,
              };
          });

          const issueList = filteredIssues.map((issue: any, index: number) => `${index + 1}. [${issue.title}](${issue.html_url})`).join('\n');

          await interaction.reply(`${issueList}`);
      } else {
          await interaction.reply('Invalid repository URL provided.');
      }
    }
};
