FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

ENTRYPOINT ["node", "/app/dist/bin/brainfuck.js"]

CMD []