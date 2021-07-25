FROM node:14.15.5-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm i
ADD . /app
RUN npm run doc

ENTRYPOINT ["npm", "start"]
