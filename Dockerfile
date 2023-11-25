FROM node:18.16.0-alpine3.17

RUN mkdir -p /dist/app
WORKDIR /dist/app

COPY package.json .
RUN npm install

COPY . .

RUN npm install vue-cli

RUN npm install -g serve

EXPOSE 8081

CMD [ "serve", "-s", "generated", "-p", "8081"]