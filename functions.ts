import fs from 'fs';
import { dictionary, regOne, regTwo } from './constants';

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

export function checkNum(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function gameResult(name: string) {
  const rezult = fs.readFileSync(`${name}.txt`).toString();
  const movesCount = rezult.split('\n').length - 1;
  const win = rezult.split('Выигрыш\n').length - 1;
  const loose = rezult.split('Проигрыш\n').length - 1;
  const winWord = getRightWord(win, 'rusWin');
  const looseWord = getRightWord(loose, 'rusLoose');
  console.log(
    `Количество партий : ${movesCount}, из них ${win} - ${winWord} и ${loose} - ${looseWord}`
      .blue,
  );
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
export function getRightWord(num: number, line: string): string {
  let correctWord = '';
  const dictArr = Object.entries(dictionary); // массив пар ключ-значения
  const numString = checkNum(num); // для сравнения с шаблоном
  dictArr.forEach((item) => {
    if (item[0] === line) {
      if (regOne.test(numString)) {
        correctWord = item[1][0];
      } else if (regTwo.test(numString)) {
        correctWord = item[1][1];
      } else correctWord = item[1][2];
    }
  });
  return correctWord;
}
