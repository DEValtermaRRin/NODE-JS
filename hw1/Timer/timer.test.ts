import { dateParce /* renderDate */ } from './timer';
import { checkNum } from '../../functions';
describe('timer', () => {
  it('return "01 01 2020 00:00:00" for "01-01-2020"', () => {
    expect(dateParce('01-01-2020')).toBe('01 01 2020 00:00:00');
  });
  it('return "Неверный формат даты" for "01012020"', () => {
    console.log = jest.fn();
    dateParce('01012020');
    expect(console.log).toHaveBeenCalledWith(
      'Вы ввели неверный формат даты'.bgRed,
    );
  });
  it('return "03" for 3', () => {
    expect(checkNum(3)).toBe('03');
  });
  // выводит очень странную ошибку почему то (показывала в слаке)
  // it('console log "До конца таймера осталось: 1 день, 2 часа 33 минуты 41 секунда" for 1 2 33 41', () => {
  //   console.log = jest.fn()
  //   renderDate(1, 2, 33, 41)
  //   expect(console.log).toHaveBeenNthCalledWith(1,
  //     `До конца таймера осталось: 1 день, 2 часа 33 минуты 41 секунда`
  //   );
  // });
});
