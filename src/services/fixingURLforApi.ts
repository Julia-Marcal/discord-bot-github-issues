export const convertToAPIEndpoint = (repositoryUrl: string) => {
  const regex = /github\.com\/([^/]+)\/([^/]+)/;
  const matches = repositoryUrl.match(regex);
  if (matches && matches.length === 3) {
    const owner = matches[1];
    const repo = matches[2];
    return `https://api.github.com/repos/${owner}/${repo}`;
  }
  return null;
}

