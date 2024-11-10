import { Tape } from './tape';
import { Token } from './tokenizer';

export class Processor {
  private tape: Tape;
  private output: string;

  constructor(tape: Tape) {
    this.tape = tape;
    this.output = '';
  }

  executeAll(instructions: Token[]): void {
    let pointer = 0;

    while (pointer < instructions.length) {
      pointer = this.execute(pointer, instructions);
      pointer++;
    }
  }

  execute(pointer: number, instructions: Token[]): number {
    const instruction = instructions[pointer];

    switch (instruction) {
      case '>':
        this.tape.moveRight();

        break;
      case '<':
        this.tape.moveLeft();

        break;
      case '+':
        this.tape.increment();

        break;
      case '-':
        this.tape.decrement();

        break;
      case '.':
        this.output += String.fromCharCode(this.tape.getValue());

        break;
      case '[':
        if (this.tape.getValue() === 0) {
          pointer = this.jumpToEndOfLoop(pointer, instructions);
        }

        break;
      case ']':
        if (this.tape.getValue() !== 0) {
          pointer = this.findMatchingLoopStart(pointer, instructions);
        }

        break;
    }

    return pointer;
  }

  getOutput(): string {
    return this.output;
  }

  private jumpToEndOfLoop(pointer: number, instructions: Token[]): number {
    let loopNesting = 1;

    while (loopNesting > 0) {
      pointer++;
      if (pointer >= instructions.length) {
        throw new Error("Unmatched '[' in the code");
      }
      if (instructions[pointer] === '[') {
        loopNesting++;
      } else if (instructions[pointer] === ']') {
        loopNesting--;
      }
    }

    return pointer;
  }

  private findMatchingLoopStart(
    pointer: number,
    instructions: Token[]
  ): number {
    let loopNesting = 1;

    while (loopNesting > 0) {
      pointer--;

      if (pointer < 0) {
        throw new Error("Unmatched ']' in the code");
      }

      if (instructions[pointer] === ']') {
        loopNesting++;
      } else if (instructions[pointer] === '[') {
        loopNesting--;
      }
    }

    return pointer;
  }
}
