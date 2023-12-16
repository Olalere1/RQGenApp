FROM node:14 as builder  

WORKDIR /usr/src/app

COPY package.json  ./
RUN npm install

COPY dist/ ./dist/
COPY server.js ./

RUN npm build

FROM nginx
WORKDIR /usr/src/app

COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT = 3000
EXPOSE 80


