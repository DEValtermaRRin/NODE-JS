import fs from 'fs';
import { DateTime } from 'luxon';

import {
  makeIp,
  appendFileLog,
  createFileLog,
} from '../functions';

const date = DateTime.now()
  .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
  .split('.')
  .join('/')
  .split(', ')
  .join(':');

const stringLog = () => `${makeIp()} - - [${date} +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"\n`;

const maxFileSize = 100 * 1024 * 1024

const appLog = () => {
  createFileLog('access')
  appendFileLog('access', stringLog())
  fs.watchFile('access.log', function () {
    fs.stat('access.log', function (err, stats) {
      let fileSize = stats.size;
      console.log(fileSize);
      if (fileSize <= maxFileSize) appendFileLog('access', stringLog())
    });
  })  
};

appLog() 