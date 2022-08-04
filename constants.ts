import fs from 'fs';

// TODO попробовать на промисах
export function createFileLog(name: string) {
  fs.open(`${name}.txt`, 'as+', (err) => {
    if (err) throw err;
    console.log(`Создан файл ${name}`);
  });
}
export function deleteFileLog(name: string) {
  fs.unlink(name, (err) => {
    if (err) throw err;
    console.log(`Файл ${name} удален`);
  });
}

export function appendFileLog(name: string, text: string) {
  fs.appendFile(`${name}.txt`, text, (err) => {
    if (err) throw err;
  });
}

export function gameResult(name: string) {
  const rezult = fs.readFileSync(`${name}.txt`).toString();  
  const movesCount = rezult.split('\n').length - 1;
  const win = rezult.split('Выигрыш\n').length - 1
  const loose = rezult.split('Проигрыш\n').length - 1
  console.log(`Количество партий : ${movesCount}, из них ${win} - выигрышей и ${loose} - проигрышей`.blue);  
}

function clearFileLog(name: string) {
  fs.truncate(`${name}.txt`, (err) => {
    if (err) throw err;
  });
}

export function isFileExist(name: string) {
  fs.stat(`${name}.txt`, (err) => {
    err ? createFileLog(name) : clearFileLog(name);
  });
}
