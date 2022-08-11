import fs from 'fs';
import { DateTime } from 'luxon';

import { NUM } from '../functions';

const ACCESS_LOG = './access.log';
const maxFileSize = 100 * 1024 * 1024;

const date = DateTime.now()
  .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
  .split('.')
  .join('/')
  .split(', ')
  .join(':');

export const appCreateLog = () => {
  const createFileLog = fs.createWriteStream(ACCESS_LOG, {
    encoding: 'utf8',
    flags: 'a',
  });
  console.log('Генерируем файл 100мб');
  const writeToLog = async (query: any) =>
    new Promise((resolve) => createFileLog.write(query, resolve));
  const addDataToLog = async () => {
    const ip = () =>
      `${NUM(0, 256)}.${NUM(0, 256)}.${NUM(0, 256)}.${NUM(0, 256)}`;

    const stringLog = [
      `${ip()} - - [${date} +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"\n`,
      `${ip()} - - [${date} +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"\n`,
    ];

    for (let item of stringLog) {
      await writeToLog(item);
    }

    if (fs.lstatSync(ACCESS_LOG).size <= maxFileSize) {
      await addDataToLog();
    } else {
      createFileLog.end();
      console.log('end');
    }
  };
  fs.stat(ACCESS_LOG, (err, stat) => {
    if (!err) {
      stat.size <= maxFileSize ? addDataToLog() : console.log('file created');
    } else if (err.code === 'ENOENT') {
      addDataToLog();
    } else console.log('Other Error: ', err.code);
  });
};


