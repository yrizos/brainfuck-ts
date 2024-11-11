import { Input } from '../src/input';

describe('Input', () => {
  it('should return 0 when input is empty', () => {
    const input = new Input('');

    expect(input.read()).toBe(0);
  });

  it('should return the correct char code for a single character input', () => {
    const input = new Input('A');

    expect(input.read()).toBe(65); // 'A' char code is 65
    expect(input.read()).toBe(0); // No more characters left
  });

  it('should return the correct char codes for multiple characters input', () => {
    const input = new Input('ABC');

    expect(input.read()).toBe(65); // 'A' char code is 65
    expect(input.read()).toBe(66); // 'B' char code is 66
    expect(input.read()).toBe(67); // 'C' char code is 67
    expect(input.read()).toBe(0); // No more characters left
  });

  it('should handle input with spaces correctly', () => {
    const input = new Input('A B');

    expect(input.read()).toBe(65); // 'A' char code is 65
    expect(input.read()).toBe(32); // ' ' (space) char code is 32
    expect(input.read()).toBe(66); // 'B' char code is 66
    expect(input.read()).toBe(0); // No more characters left
  });

  it('should handle input with special characters correctly', () => {
    const input = new Input('A\nB');

    expect(input.read()).toBe(65); // 'A' char code is 65
    expect(input.read()).toBe(10); // '\n' (newline) char code is 10
    expect(input.read()).toBe(66); // 'B' char code is 66
    expect(input.read()).toBe(0); // No more characters left
  });
});
