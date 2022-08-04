import readline from 'readline';
import colors from 'colors';

import { regexp } from '../../constants';
import { getRightWord } from '../../functions';

const rl = readline.createInterface({
  input: process.stdin,
});

export function dateParce(date: string): string {
  if (!regexp.test(date)) {
    console.log('Вы ввели неверный формат даты'.bgRed);
  }
  const userDate = date.split('-');
  return `${userDate[1]} ${userDate[0]} ${userDate[2]} 00:00:00`;
}

export function renderDate(dd: number, hh: number, mm: number, ss: number) {
  const wordDay = getRightWord(dd, 'rusDays');
  const wordHour = getRightWord(hh, 'rusHours');
  const wordMin = getRightWord(mm, 'rusMinutes');
  const wordSec = getRightWord(ss, 'rusSeconds');
  console.log(
    colors.green(
      `До конца таймера осталось: ${dd} ${wordDay}, ${hh} ${wordHour} ${mm} ${wordMin} ${ss} ${wordSec}`,
    ),
  );
}

export const appTimer = () => {
  console.log('Введите дату в формате ДД-ММ-ГГГГ');
  rl.on('line', (answer: string) => {
    const endDate = new Date(dateParce(answer)).getTime();
    const timer = setInterval(() => {
      const nowDate = new Date().getTime();
      const time = endDate - nowDate;
      const days = time > 0 ? Math.floor(time / 1000 / 60 / 60 / 24) : 0;
      const hours = time > 0 ? Math.floor(time / 1000 / 60 / 60) % 24 : 0;
      const minutes = time > 0 ? Math.floor(time / 1000 / 60) % 60 : 0;
      const seconds = time > 0 ? Math.floor(time / 1000) % 60 : 0;
      renderDate(days, hours, minutes, seconds);
      if (time <= 0) {
        console.log('Время истекло!'.red);
        clearInterval(timer);
        rl.close();
      }
    }, 1000);
    if (isNaN(endDate)) clearInterval(timer);
  });
};

appTimer();
