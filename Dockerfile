FROM node:alpine

WORKDIR /src/main

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]
