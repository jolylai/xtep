import { move } from '../utils';

describe('utils', () => {
  test('shound move worlk ', () => {
    const arr = [1, 2, 3];
    expect(move(arr, 0, 2)).toEqual([2, 3, 1]);
  });
});
