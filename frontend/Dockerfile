FROM node:alpine

WORKDIR /usr/frontend

COPY ./pnpm-lock.yaml ./
COPY ./package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY ./ ./

RUN pnpm run build

CMD ["pnpm", "run", "start"]