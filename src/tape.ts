export class Tape {
  private slots: number[];
  private pointer: number;

  constructor(size: number = 100000) {
    this.slots = Array(size).fill(0);
    this.pointer = 0;
  }

  increment() {
    this.slots[this.pointer] = (this.slots[this.pointer] + 1) % 256;
  }

  decrement() {
    this.slots[this.pointer] = (this.slots[this.pointer] - 1 + 256) % 256;
  }

  moveRight() {
    this.pointer = (this.pointer + 1) % this.slots.length;
  }

  moveLeft() {
    this.pointer = (this.pointer - 1 + this.slots.length) % this.slots.length;
  }

  getValue(): number {
    return this.slots[this.pointer];
  }

  setValue(value: number) {
    this.slots[this.pointer] = value;
  }
}
