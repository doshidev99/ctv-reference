FROM node:10-alpine as build

WORKDIR /app

ENV REACT_APP_SERVER_URL https://ctv-api-staging.sgroup.ga/api/v1

COPY package.json /app/package.json

RUN npm install --silent

COPY . /app

CMD ["npm", "start"]
EXPOSE 3000
