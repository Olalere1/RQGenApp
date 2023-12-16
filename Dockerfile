FROM node:14 as builder  

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY ./dist/ /app/dist/
COPY ./server.js /app/

RUN npm build

FROM nginx
WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT = 3000
EXPOSE 80


