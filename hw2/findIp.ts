import fs from 'fs';
import readline from 'readline';

const ACCESS_LOG = 'access.log'
const DATA = fs.readFileSync(ACCESS_LOG).toString()

console.log(DATA.split('\n'));





