FROM node:18-alpine3.17 

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

EXPOSE ${PORT}

CMD npm run start && npx prisma generate && npx prisma migrate dev

