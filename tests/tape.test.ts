import { Tape } from '../src/tape';

describe('Tape', () => {
  let tape: Tape;

  beforeEach(() => {
    tape = new Tape(10);
  });

  it('should initialize cells with 0', () => {
    for (let i = 0; i < 10; i++) {
      expect(tape.getValue()).toBe(0);
      tape.moveRight();
    }
  });

  it('should increment cell value', () => {
    tape.increment();
    expect(tape.getValue()).toBe(1);
  });

  it('should decrement cell value', () => {
    tape.decrement();
    expect(tape.getValue()).toBe(255);
  });

  it('should set cell value', () => {
    tape.setValue(42);
    expect(tape.getValue()).toBe(42);
  });

  test('should move the pointer left and right', () => {
    tape.setValue(1);
    expect(tape.getValue()).toBe(1);

    tape.moveRight();
    expect(tape.getValue()).toBe(0);

    tape.setValue(2);
    expect(tape.getValue()).toBe(2);

    tape.moveRight();
    expect(tape.getValue()).toBe(0);

    tape.setValue(3);
    expect(tape.getValue()).toBe(3);

    tape.moveLeft();
    expect(tape.getValue()).toBe(2);

    tape.moveLeft();
    expect(tape.getValue()).toBe(1);
  });
});
