FROM docker.io/library/alpine:edge AS builder
ARG VITE_API_HOSTNAME

RUN apk add --no-cache nodejs-current npm

WORKDIR /src
COPY . .

RUN echo "VITE_API_HOSTNAME=${VITE_API_HOSTNAME}" > .env.local && \
    npm i && \
    npm run build

FROM docker.io/library/nginx:alpine

COPY --from=builder /src/dist /dist
COPY nginx.conf /etc/nginx/nginx.conf
