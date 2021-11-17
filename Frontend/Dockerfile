FROM node:14

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/app

COPY . .

# Build frontend
WORKDIR /usr/src/app/Frontend
RUN npm install -g pm2
RUN npm i && npm rebuild node-sass && npm run build

EXPOSE 3000/tcp

CMD /wait && npm start
