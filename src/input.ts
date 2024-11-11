export class Input {
  private input: string;
  private inputPointer: number;

  constructor(input: string = '') {
    this.input = input;
    this.inputPointer = 0;
  }

  read(): number {
    if (this.inputPointer < this.input.length) {
      return this.input.charCodeAt(this.inputPointer++);
    } else {
      return 0;
    }
  }
}
