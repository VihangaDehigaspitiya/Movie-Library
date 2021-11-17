FROM node:14

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/app

COPY . .

# Build backend
WORKDIR /usr/src/app/Backend
RUN npm install
RUN npm install -g pm2
RUN npm install -g nodemon
#RUN npm run dbmigrate
#RUN npm run dbmigrate:test
#RUN npm run test:coverage

# Indicate port 8042 should be exposed
EXPOSE 8042/tcp

#RUN chmod +x entrypoint.sh      # if required
ENTRYPOINT ["/usr/src/app/Backend/entrypoint.sh"]
# EXPOSE 8042

# Run
CMD /wait && pm2-runtime server.js
