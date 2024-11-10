#!/usr/bin/env ts-node

import { tokenize } from '../src/tokenizer';
import { Tape } from '../src/tape';
import { Processor } from '../src/processor';

function run(code: string) {
  const instructions = tokenize(code);
  const tape = new Tape();
  const processor = new Processor(tape);

  processor.execute(instructions);

  console.log(processor.getOutput());
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: brainfuck "<code>"');

  process.exit(1);
}

const code = args[0];

run(code);
