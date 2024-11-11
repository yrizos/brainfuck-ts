import { Tape } from './tape';
import { Token } from './tokenizer';
import { Input } from './input';
import { Output } from './output';

export class Processor {
  private tape: Tape;
  private output: Output;
  private input: Input;

  constructor(tape: Tape, input: Input) {
    this.tape = tape;
    this.input = input;
    this.output = new Output();
  }

  execute(instructions: Token[]): void {
    this.validateBrackets(instructions);

    let pointer = 0;

    while (pointer < instructions.length) {
      pointer = this.executeInstruction(pointer, instructions);
      pointer++;
    }
  }

  private executeInstruction(pointer: number, instructions: Token[]): number {
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

      case ',':
        this.tape.setValue(this.input.read());

        break;
      case '.':
        this.output.append(this.tape.getValue());

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
    return this.output.getOutput();
  }

  private validateBrackets(instructions: Token[]): void {
    let pointer = 0;

    while (pointer < instructions.length) {
      const instruction = instructions[pointer];

      if (instruction === '[') {
        pointer = this.findMatchingBracket(pointer, instructions, '[', ']');
      } else if (instruction === ']') {
        throw new Error("Unmatched ']' in the code");
      }

      pointer++;
    }

    pointer = 0;
    while (pointer < instructions.length) {
      const instruction = instructions[pointer];

      if (instruction === '[') {
        this.findMatchingBracket(pointer, instructions, '[', ']');
      }

      pointer++;
    }
  }

  private jumpToEndOfLoop(pointer: number, instructions: Token[]): number {
    return this.findMatchingBracket(pointer, instructions, '[', ']');
  }

  private findMatchingLoopStart(
    pointer: number,
    instructions: Token[]
  ): number {
    return this.findMatchingBracket(pointer, instructions, ']', '[');
  }

  private findMatchingBracket(
    pointer: number,
    instructions: Token[],
    openBracket: Token,
    closeBracket: Token
  ): number {
    let loopNesting = 1;
    const step = openBracket === '[' ? 1 : -1;

    while (loopNesting > 0) {
      pointer += step;

      if (pointer < 0 || pointer >= instructions.length) {
        throw new Error(`Unmatched '${openBracket}' in the code`);
      }

      if (instructions[pointer] === openBracket) {
        loopNesting++;
      } else if (instructions[pointer] === closeBracket) {
        loopNesting--;
      }
    }

    return pointer;
  }
}
