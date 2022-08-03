import { dateParce, checkNum, renderDate, appTimer } from './timer';

describe('timer', () => {
  it('return "01 01 2020 00:00:00" for "01-01-2020"', () => {
    expect(dateParce('01-01-2020')).toBe('01 01 2020 00:00:00');
  });
  it('return "Неверный формат даты" for "01012020"', () => {
    expect(dateParce('01012020')).toBe('undefined 01012020 undefined 00:00:00');
  });
  it('return "03" for 3', () => {
    expect(checkNum(3)).toBe('03');
  });
  it('return "До конца таймера осталось: 1 день, 2 часа 33 минуты 41 секунда" for 1 2 33 41', () => {
    expect(renderDate(1, 2, 33, 41)).toBe(
      'До конца таймера осталось: 1 день, 2 часа 33 минуты 41 секунда',
    );
  });
});
