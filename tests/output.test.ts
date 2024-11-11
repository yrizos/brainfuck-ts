import { Output } from '../src/output';

describe('Output', () => {
  let output: Output;

  beforeEach(() => {
    output = new Output();
  });

  it('should initialize with an empty string', () => {
    expect(output.getOutput()).toBe('');
  });

  it('should append a character to the output', () => {
    output.append(65); // ASCII code for 'A'

    expect(output.getOutput()).toBe('A');
  });

  it('should append multiple characters to the output', () => {
    output.append(65); // ASCII code for 'A'
    output.append(66); // ASCII code for 'B'
    output.append(67); // ASCII code for 'C'

    expect(output.getOutput()).toBe('ABC');
  });
});
