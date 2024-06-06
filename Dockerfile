FROM node:21.7.2-alpine

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
