FROM node:22.4.1

RUN corepack enable

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN yarn install
RUN yarn prisma generate

COPY . .

RUN yarn build

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "start:dev"]

