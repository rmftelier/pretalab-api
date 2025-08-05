import soma from '../../src/soma';

describe('Soma', () => {
  it('deve somar dois números inteiros', () => {
    expect(soma(2, 3)).toBe(5);
  })
})