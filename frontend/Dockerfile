FROM node:18

WORKDIR /frontend

COPY packege*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve"]