FROM node:14.15.5-alpine

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm i -g pm2 --quiet
RUN npm install
RUN npm run build:dev
RUN npm install serve -g

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "dist", "-l", "3000"]
