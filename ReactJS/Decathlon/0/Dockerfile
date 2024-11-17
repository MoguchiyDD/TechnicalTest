FROM node:20.18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY server /app/server
COPY db.sqlite /app

EXPOSE 5000

CMD ["yarn", "start:server"]
