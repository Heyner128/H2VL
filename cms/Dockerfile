FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/config ./config
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/tsconfig.json .
COPY --from=builder /usr/src/app/favicon.png .

ENV NODE_ENV=production

RUN npm install --omit=dev

CMD ["npm", "start"]
