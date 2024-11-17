FROM node:20.18

WORKDIR /app

COPY client/package.json client/yarn.lock ./client/

RUN cd client && yarn install

COPY . /app/

EXPOSE 5173

CMD ["yarn", "dev"]
