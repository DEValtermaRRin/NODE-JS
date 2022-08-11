import fs from 'fs';
import readline from 'readline';
import * as path from 'path';
import inquirer from 'inquirer';

const executeDir = process.cwd();

export const appFindIP = () => {
  const findIp = (file: string) => fs.lstatSync(file).isFile();
  const list = fs.readdirSync('./').filter(findIp);
  inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list',
        message: 'Выберете файл для чтения',
        choices: list,
      },
      { name: 'ip', message: 'Введите  ip' },
    ])
    .then(({ fileName, ip }) => {
      const fullFilePath = path.join(executeDir, fileName);
      const readStream = fs.createReadStream(fullFilePath, {
        encoding: 'utf8',
      });
      const createFilterFileLog = fs.createWriteStream(`${ip}_requiests.log`, {
        encoding: 'utf8',
        flags: 'a',
      });
      const rl = readline.createInterface({
        input: readStream,
      });
      rl.on('line', (line) => {
        const regExp = /^\S+/gim;
        if (line.match(regExp)![0] == ip) {
          // оператор ненулевого утверждения
          createFilterFileLog.write(line);
        }
      });
      console.log(`Файл с именем ${ip}_requests.log создан`);
    });
};

