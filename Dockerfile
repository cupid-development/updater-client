FROM docker.io/library/node:current-alpine AS builder
ARG VITE_API_HOSTNAME

WORKDIR /src
COPY . .

RUN echo "VITE_API_HOSTNAME=${VITE_API_HOSTNAME}" > .env.local && \
    npm i && \
    npm run build

FROM docker.io/library/nginx:alpine

COPY --from=builder /src/dist /dist
COPY nginx.conf /etc/nginx/nginx.conf
