const inquirer = require('inquirer');
const fs = require('fs');
const generateReadme = require('./index.js');

jest.mock('inquirer');
jest.mock('fs', () => ({
 readFileSync: jest.fn(),
 writeFile: jest.fn((path, data, callback) => callback(null)),
}));

describe('README Generator', () => {
 it('generates a README.md file with the provided input', async () => {
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

    const result = await generateReadme();
    expect(result).toBe('README.md has been created!');

    expect(fs.writeFile).toHaveBeenCalledWith(
      'README.md',
      expect.any(String),
      expect.any(Function)
    );
 });
});
