import colors from 'colors';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
});

const primeNumbers: number[] = [];

colors.setTheme({
  green: 'green',
  yellow: 'yellow',
  red: 'red',
});

export function foundPrimeNumbers(n: number): number[] {
  for (let i = 2; i <= n; i++) {
    let found = 1;
    for (let j = 2; j <= i / 2 && found === 1; j++) {
      if (i % j === 0) {
        found = 0;
      }
    }
    if (found === 1) primeNumbers.push(i);
  }
  return primeNumbers;
}

function renderNumbers(arr: number[]) {
  for (let i = 0; i < arr.length; i += 3) {
    console.log(`${arr[i]}`.green);
    if (arr[i + 1]) {
      console.log(`${arr[i + 1]}`.yellow);
      if (arr[i + 2]) {
        console.log(`${arr[i + 2]}`.red);
      } else break;
    } else break;
  }
}

// второй вариант реализации
// rl.question('Введите число:  ', (answer: string) => {
// });

export const appNumbers = () => {
  console.log('Введите число:  ');
  rl.on('line', (answer: string) => {
    let num = Math.round(Number(answer));
    if (isNaN(num)) {
      console.log(colors.red('Вы ввели не число'));
      rl.close();
    }
    if (num === 1 || num <= 0) {
      console.log(colors.red('Простых чисел в указанном диапазоне нет'));
      rl.close();
    } else {
      foundPrimeNumbers(num);
      renderNumbers(primeNumbers);
    }
    // rl.close(); // раскоменнтировать, если нужно однократное выполнение кода
  });
};
