import inquirer from 'inquirer';

import { appCreateLog } from './createLog';
import { appFindIP } from './findIp';

const action = ['generate', 'search'];

inquirer
  .prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Выберите файл для чтения',
      choices: action,
    },
  ])
  .then(({ action }) => {
    switch (action) {
      case 'generate':
        appCreateLog()
        break;
      case 'search':
        appFindIP()
        break;
      default: 
      console.log('Приложение закрыто');
      
    }
  });
