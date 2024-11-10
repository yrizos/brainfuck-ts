export type Token = '>' | '<' | '+' | '-' | '.' | ',' | '[' | ']';

export function tokenize(input: string): Token[] {
  return input
    .split('')
    .filter((char) =>
      ['>', '<', '+', '-', '.', ',', '[', ']'].includes(char as Token)
    ) as Token[];
}
