FROM node:14.15.5-alpine

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm i
ADD . /app

ENTRYPOINT ["npm", "start"]
