FROM node:14.17.0

RUN mkdir -p apps/articles

WORKDIR /apps/articles

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run prebuild

RUN npm run build

CMD [ "pm2", "start", "pm2.json" ]
