FROM node:18-alpine3.17 as dependencies
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules/ node_modules
COPY . .
EXPOSE 4000
CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev
