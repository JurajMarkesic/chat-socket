FROM node:16-alpine AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:12.13-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["node", "dist/index.js"]
