export class Output {
  private output: string;

  constructor() {
    this.output = '';
  }

  append(value: number): void {
    this.output += String.fromCharCode(value);
  }

  getOutput(): string {
    return this.output;
  }
}
