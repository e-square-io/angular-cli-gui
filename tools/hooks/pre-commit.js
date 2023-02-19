const { execSync } = require('child_process');

/** Map of forbidden words and their match regex */
const words = {
  fit: '\\s*fit\\(',
  fdescribe: '\\s*fdescribe\\(',
  debugger: '(debugger);?',
};
let status = 0;
for (let word of Object.keys(words)) {
  const matchRegex = words[word];
  const gitCommand = `git diff --staged -G"${matchRegex}" --name-only`;
  const badFiles = execSync(gitCommand).toString();
  const filesAsArray = badFiles.split('\n');
  const tsFileRegex = /\.ts$/;
  const onlyTsFiles = filesAsArray.filter((file) =>
    tsFileRegex.test(file.trim())
  );
  if (onlyTsFiles.length) {
    status = 1;
    console.error(`The following files contains '${word}' in them:`);
    console.log(onlyTsFiles.join('\n'));
  }
}
process.exit(status);
