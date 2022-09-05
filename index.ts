import readline from 'readline';

import { appOrelReshka } from './hw1/OrelReshka/orelReshka';
import { appNumbers } from './hw1/PrimeNumbers';
import { appTimer } from './hw1/Timer/timer';

const rl = readline.createInterface({
  input: process.stdin,
});
// в разработке) 
/* console.log(
  'Какую программу запустить?\n1 - Вывод простых чисел\n2 - Таймер обратного отсчета\n3 - Игра Орел или Решка',
);

rl.on('line', (answer: string) => {
  Promise.resolve(answer ==='1').then(() => {appNumbers})
  Promise.resolve(answer ==='2').then(() => {appTimer})
  Promise.resolve(answer ==='3').then(() => {appOrelReshka})

});
 */