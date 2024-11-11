# Brainfuck Interpreter in TypeScript

A TypeScript-based [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) interpreter.

## Setup

Clone the repository:

```sh
git clone https://github.com/yrizos/brainfuck-ts.git
cd brainfuck-ts
```

Install depedencies:

```sh
npm install
```

Build the project

```sh
npm run build
```

## Run tests

```sh
npm test
```

## Run the CLI

### Hello World

```sh
ts-node bin/brainfuck.ts '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.'
```

### Input and Output

These examples read characters from the input and outputs them.

```sh
ts-node bin/brainfuck ',.' 'A'
ts-node bin/brainfuck ',.,.,.' 'ABC'
```

## Building and Running with Docker

### Build the Docker Image

To build the Docker image, run the following command:

```sh
docker build -t brainfuck-ts .
```

### Run the Docker Container

To run the Docker container, use the following command:

```sh
docker run --rm brainfuck-ts '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.'
```
