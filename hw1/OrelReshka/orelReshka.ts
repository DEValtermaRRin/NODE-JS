import readline from 'readline';
import colors from 'colors';

// знаю-знаю, нужно вводить алиасы))
import { appendFileLog, gameResult, isFileExist } from '../../functions';

const rl = readline.createInterface({
  input: process.stdin,
});

export const num = () => Math.round(Math.random() + 1);
let arrToCheck: number[] = [];

export function checkAnswer(answer: string) {
  const userNum = Number(answer);
  if (isNaN(userNum) && answer !== 'exit') {
    console.log(colors.red('Вы ввели не число. Игра окончена'));
    getGameRezults();
    return 0;
  } else if (Number.isInteger(userNum) && userNum !== 1 && userNum !== 2) {
    console.log('Вы ввели неверное число\nК сожалению игра окончена'.red);
    getGameRezults();
    return 0;
  } else if (answer === 'exit') {
    console.log('Игра окончена'.yellow);
    getGameRezults();
    return 0;
  }
  return userNum;
}

export function checkingArr(arr: number[]) {
  arr[0] === 1
    ? console.log('Компьютер вытащил Орла'.blue)
    : console.log('Компьютер вытащил Решку'.blue);
  if (arr[0] === arr[1]) {
    appendFileLog('orel-reshka-log', 'Выигрыш\n');
    console.log('Вы выиграли :))'.bold);
  } else {
    appendFileLog('orel-reshka-log', 'Проигрыш\n');
    console.log('Вы проиграли :(('.black);
  }
}
async function getGameRezults() {
  await Promise.resolve().then(() => {
    gameResult('orel-reshka-log');
  });
}

export const appOrelReshka = () => {
  // проверяем папку на наличие файла лога,
  // если нет - создаем, если есть - очищаем
  isFileExist('orel-reshka-log');
  console.log(
    'Угадайте: Орел(1) или Решка(2)?\nДля выхода из игры введите "exit"',
  );
  rl.on('line', (answer: string) => {
    arrToCheck = [];
    const userNum = checkAnswer(answer);
    if (userNum) {
      arrToCheck.push(num(), userNum);
      checkingArr(arrToCheck);
    } else {
      rl.close();
    }
  });
};

appOrelReshka();
