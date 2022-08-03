import readline from 'readline';
import colors from 'colors';

const rl = readline.createInterface({
  input: process.stdin,
});

const regexp = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/;
const regOne = /^[234567890]1$/;
const regTwo = /^[023456789][2-4]$/;

const dictionary = {
  rusDays: ['день', 'дня', 'дней'],
  rusHours: ['час', 'часа', 'часов'],
  rusMinutes: ['минута', 'минуты', 'минут'],
  rusSeconds: ['секунда', 'секунды', 'секунд'],
};

export function dateParce(date: string): string {
  if (!regexp.test(date)) {
    console.log(colors.white('Вы ввели неверный формат даты').bgRed);
  }
  let userDate = date.split('-');
  return `${userDate[1]} ${userDate[0]} ${userDate[2]} 00:00:00`;
}

export function checkNum(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function renderDate(dd: number, hh: number, mm: number, ss: number): string {
  let wordDay = '';
  let wordHour = '';
  let wordMin = '';
  let wordSec = '';
  const day = checkNum(dd);
  const hour = checkNum(hh);
  const min = checkNum(mm);
  const sec = checkNum(ss);
  if (regOne.test(day)) {
    wordDay = dictionary.rusDays[0];
  } else if (regTwo.test(day)) {
    wordDay = dictionary.rusDays[1];
  } else wordDay = dictionary.rusDays[2];
  if (regOne.test(hour)) {
    wordHour = dictionary.rusHours[0];
  } else if (regTwo.test(hour)) {
    wordHour = dictionary.rusHours[1];
  } else wordHour = dictionary.rusHours[2];
  if (regOne.test(min)) {
    wordMin = dictionary.rusMinutes[0];
  } else if (regTwo.test(min)) {
    wordMin = dictionary.rusMinutes[1];
  } else wordMin = dictionary.rusMinutes[2];
  if (regOne.test(sec)) {
    wordSec = dictionary.rusSeconds[0];
  } else if (regTwo.test(sec)) {
    wordSec = dictionary.rusSeconds[1];
  } else wordSec = dictionary.rusSeconds[2];
  return `До конца таймера осталось: ${dd} ${wordDay}, ${hh} ${wordHour} ${mm} ${wordMin} ${ss} ${wordSec}`;
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
      console.log(renderDate(days, hours, minutes, seconds).green);
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
