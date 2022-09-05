import { checkAnswer, checkingArr } from './orelReshka';

describe('checkAnswer', () => {
  it('return 0 for asd', () => {
    expect(checkAnswer('asd')).toBe(0);
  });
  it('return 0 for 3', () => {
    expect(checkAnswer('3')).toBe(0);
  });
  it('return 1 for 1', () => {
    expect(checkAnswer('1')).toBe(1);
  });
  it('console.log Вы ввели не число for asd', () => {
    console.log = jest.fn();
    checkAnswer('asd');
    expect(console.log).toHaveBeenCalledWith(
      'Вы ввели не число. Игра окончена'.red,
    );
  });
});

describe('checkingArr', () => {
  it('console.log Компьютер вытащил Орла for [1, 1]', () => {
    console.log = jest.fn();
    checkingArr([1, 1]);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      'Компьютер вытащил Орла'.blue,
    );
  });
  it('console.log Вы выиграли for [2, 2]', () => {
    console.log = jest.fn();
    checkingArr([2, 2]);
    expect(console.log).toHaveBeenNthCalledWith(2, 'Вы выиграли :))'.bold);
  });
  it('console.log Вы проиграли :(( for [1, 2]', () => {
    console.log = jest.fn();
    checkingArr([1, 2]);
    expect(console.log).toHaveBeenNthCalledWith(2, 'Вы проиграли :(('.black);
  });
});
