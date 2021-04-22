FROM node:14.15.1-alpine3.12

RUN apk add --update --no-cache git gcompat gettext

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i --loglevel verbose

COPY . .

RUN npx prisma generate
RUN npx eslint .
RUN npm run type-check
RUN npm run build
RUN npm prune --production

FROM node:14.15.1-alpine3.12

RUN apk add --update --no-cache git gcompat gettext

WORKDIR /app

COPY --from=0 /app .

CMD ["node", "dist/server"]
