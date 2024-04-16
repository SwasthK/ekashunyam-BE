FROM node:20.11.0-alpine3.19

LABEL name="backend of ekashuunyam" \
    version="1.0" 

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm","run","start" ]