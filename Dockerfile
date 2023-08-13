FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

FROM node:18-alpine3.17

WORKDIR /app

COPY --from=build /app/node_modules/ node_modules
COPY package.json . tsconfig*.json nest-cli.json ./
COPY doc/ doc/
COPY prisma/ prisma/
COPY src/ src/

EXPOSE ${PORT}

CMD npx prisma migrate dev && npm run start:dev 

