FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD npx prisma migrate dev && npm run dev