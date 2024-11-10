import { Processor } from '../src/processor';
import { Tape } from '../src/tape';
import { tokenize, Token } from '../src/tokenizer';

describe('Processor', () => {
  let tape: Tape;
  let processor: Processor;

  beforeEach(() => {
    tape = new Tape(10);
    processor = new Processor(tape);
  });

  it('should handle a series of increment instructions', () => {
    const instructions: Token[] = tokenize('+++.');

    processor.execute(instructions);

    expect(processor.getOutput()).toBe(String.fromCharCode(3));
  });

  it('should handle a series of decrement instructions', () => {
    const instructions: Token[] = tokenize('---.');

    processor.execute(instructions);

    expect(processor.getOutput()).toBe(String.fromCharCode(253));
  });

  it('should handle a series of increment and decrement instructions', () => {
    const instructions: Token[] = tokenize('+++-.');

    processor.execute(instructions);

    expect(processor.getOutput()).toBe(String.fromCharCode(2));
  });

  it('should handle unmatched "[" error', () => {
    const instructions: Token[] = tokenize('++[');

    expect(() => processor.execute(instructions)).toThrow(
      "Unmatched '[' in the code"
    );
  });

  it('should handle unmatched "]" error', () => {
    const instructions: Token[] = tokenize('++]');

    expect(() => processor.execute(instructions)).toThrow(
      "Unmatched ']' in the code"
    );
  });

  it('should correctly set slot 1 to 100 and output "d"', () => {
    // 1. '++++++++++' - Initialize slot 0 with the value 10. This will act as a counter for our loop.
    // 2. '[' - Start a loop that will run as long as the current slot (slot 0) is not zero.
    //    a. '>' - Move to slot 1.
    //    b. '++++++++++' - Increment slot 1 by 10. Each iteration of the loop will add 10 to slot 1.
    //    c. '<' - Move back to slot 0.
    //    d. '-' - Decrement slot 0 by 1.
    // 3. ']' - End of the loop. The loop will run 10 times, reducing slot 0 from 10 to 0.
    //          Each loop iteration adds 10 to slot 1, resulting in slot 1 having a final value of 100.
    // 4. '>' - Move to slot 1, which now contains the value 100.
    // 5. '.' - Output the ASCII character corresponding to the value in slot 1 (100), which is 'd'.
    const instructions: Token[] = tokenize('++++++++++[>++++++++++<-]>.');

    processor.execute(instructions);

    expect(processor.getOutput()).toBe('d');
  });

  it('should correctly set slot 2 to 64 and output "@"', () => {
    // 1. '++++++++' - Initialize slot 0 with the value 8. This will act as the counter for the outer loop.
    // 2. '[' - Start the outer loop, which will run as long as slot 0 is not zero (8 iterations).
    //    a. '>' - Move to slot 1.
    //    b. '++++++++' - Set slot 1 to 8. This will act as the counter for the inner loop.
    //    c. '[' - Start the inner loop, which will run as long as slot 1 is not zero (8 iterations).
    //       i. '>' - Move to slot 2.
    //       ii. '+' - Increment slot 2 by 1.
    //       iii. '<' - Move back to slot 1.
    //       iv. '-' - Decrement slot 1 by 1.
    //    d. ']' - End the inner loop. After 8 inner loop iterations, slot 2 has been incremented by 8.
    //    e. '<' - Move back to slot 0.
    //    f. '-' - Decrement slot 0 by 1.
    // 3. ']' - End the outer loop. After 8 outer loop iterations, slot 2 contains 64 (8 * 8).
    // 4. '>>' - Move to slot 2, which now contains the value 64.
    // 5. '.' - Output the ASCII character corresponding to the value in slot 2 (64), which is '@'.

    const instructions: Token[] = tokenize('++++++++[>++++++++[>+<-]<-]>>.');

    processor.execute(instructions);

    expect(processor.getOutput()).toBe('@');
  });
});
