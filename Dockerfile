FROM node:18.16.0-alpine3.17

RUN mkdir -p /dist/app
WORKDIR /dist/app

COPY /package.json .
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3001

CMD [ "npm", "run", "dev"]