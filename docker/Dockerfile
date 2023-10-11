FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/

EXPOSE 3001

RUN npm install -g nodemon

CMD ["nodemon", "src/index.js"]