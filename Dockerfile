FROM node:22.4.1

RUN corepack enable

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:dev"]

