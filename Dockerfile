FROM node:14.17.0

RUN mkdir -p apps/articles

WORKDIR /apps/articles

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm i -g pm2;

RUN npm run prebuild

RUN npm run build

CMD [ "pm2-runtime", "pm2.json" ]
