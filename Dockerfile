FROM node:16.20.2
WORKDIR /app

RUN npm install nodemon -g
RUN npm install dotenv-cli -g

COPY package.json .
RUN npm install

COPY . .
EXPOSE 3000

CMD ["dotenv", "-e", "local.env", "npm", "start"]