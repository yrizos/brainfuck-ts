#!/usr/bin/env ts-node

import { tokenize } from '../src/tokenizer';
import { Tape } from '../src/tape';
import { Processor } from '../src/processor';
import { Input } from '../src/input';

function run(code: string, inputString: string) {
  const instructions = tokenize(code);
  const tape = new Tape();
  const input = new Input(inputString);
  const processor = new Processor(tape, input);

  processor.execute(instructions);

  console.log(processor.getOutput());
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: brainfuck "<code>" [input]');

  process.exit(1);
}

const code = args[0];
const inputString = args[1] || '';

run(code, inputString);
