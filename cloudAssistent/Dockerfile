FROM node:8-slim


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
# RUN npm install
EXPOSE 9090

CMD ["npm", "run", "production"]