FROM node:lts as builder

RUN npm install -g npm pnpm

WORKDIR /build

COPY ./package.json ./
COPY ./pnpm-*.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build



FROM nginx:alpine

COPY --from=builder --chown=101:101 /build/dist/ /usr/share/nginx/html/