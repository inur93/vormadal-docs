FROM node:16.9.0-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
EXPOSE 9229

CMD ["yarn", "start"]