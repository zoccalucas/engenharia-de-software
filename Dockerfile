FROM node:alpine 

WORKDIR /src/main/server.ts

COPY package*.json /src/main/server.ts/
RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]
