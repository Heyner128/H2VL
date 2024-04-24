FROM node:20 AS builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/tsconfig.json .

CMD ["npm", "start"]
