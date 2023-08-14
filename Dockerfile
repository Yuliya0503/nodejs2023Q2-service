FROM node:18-alpine3.18 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine3.18 

WORKDIR /app

COPY package.json . 
COPY --from=build /app/dist ./dist

RUN npm install -g ts-node-dev

EXPOSE 4000

CMD npx ts-node-dev --transpile-only --ignore-watch node_modules src/main.ts


