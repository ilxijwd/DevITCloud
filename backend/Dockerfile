FROM node:alpine

WORKDIR /usr/backend

COPY ./pnpm-lock.yaml ./
COPY ./package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY ./ ./

RUN pnpm run build

CMD [ "node", "dist/main.js" ]
