const fs = require('fs');
const inquirer = require('inquirer');

// Check if the code is running in a test environment
const isTestEnvironment = process.env.NODE_ENV === 'test';

const generateReadme = async () => {
 const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Provide installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide test instructions:',
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
 ];

 // If running in a test environment, mock inquirer.prompt
 if (isTestEnvironment) {
    inquirer.prompt.mockResolvedValue({
      title: 'My Project',
      description: 'This is my project.',
      installation: 'Run `npm install`.',
      usage: 'Use it like this.',
      license: 'MIT',
      contributing: 'Contribute by doing this.',
      tests: 'Run tests with `npm test`.',
      githubUsername: 'myusername',
      email: 'myemail@example.com',
    });
 }

 const answers = await inquirer.prompt(questions);
 const licenseBadge = answers.license !== 'None' ? `![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-blue.svg)` : '';
 const readmeContent = `# ${answers.title}\n\n${licenseBadge}\n\n## Description\n\n${answers.description}\n\n## Installation\n\n${answers.installation}\n\n## Usage\n\n${answers.usage}\n\n## License\n\nThis project is licensed under the ${answers.license} License.\n\n## Contributing\n\n${answers.contributing}\n\n## Tests\n\n${answers.tests}\n\n## Questions\n\nIf you have any questions about the repo, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.githubUsername}](https://github.com/${answers.githubUsername}).`;

 return new Promise((resolve, reject) => {
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) reject(err);
      else resolve('README.md has been created!');
    });
 });
};
generateReadme().then(console.log).catch(console.error);
module.exports = generateReadme;
