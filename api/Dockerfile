FROM node:alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY ./src/package*.json .
RUN chown -R node:node /home/node/app

USER node
RUN npm install

COPY --chown=node:node ./src .

EXPOSE 3000
CMD ["node", "server.js"]