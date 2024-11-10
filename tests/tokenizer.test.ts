import { tokenize } from '../src/tokenizer';

describe('tokenize', () => {
  it('should tokenize valid Brainfuck code correctly', () => {
    const code = ',>++++++[<-------->-],[<+>-]<.';
    const tokens = tokenize(code);

    expect(tokens).toEqual([
      ',',
      '>',
      '+',
      '+',
      '+',
      '+',
      '+',
      '+',
      '[',
      '<',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '>',
      '-',
      ']',
      ',',
      '[',
      '<',
      '+',
      '>',
      '-',
      ']',
      '<',
      '.',
    ]);
  });

  it('should ignore invalid characters', () => {
    const code = ',>++++++[<--invalid------>-],[<+>-]<.';
    const tokens = tokenize(code);

    expect(tokens).toEqual([
      ',',
      '>',
      '+',
      '+',
      '+',
      '+',
      '+',
      '+',
      '[',
      '<',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '>',
      '-',
      ']',
      ',',
      '[',
      '<',
      '+',
      '>',
      '-',
      ']',
      '<',
      '.',
    ]);
  });

  it('should return an empty array for code with no valid tokens', () => {
    const code = 'invalid';
    const tokens = tokenize(code);

    expect(tokens).toEqual([]);
  });
});
