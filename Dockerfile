FROM node:18 as dependencies
WORKDIR /app
COPY . .
RUN yarn install

# FROM node:16-alpine as builder
# WORKDIR /app
# COPY . .
# COPY --from=dependencies /app/node_modules ./node_modules
# RUN yarn workspace explorer build

EXPOSE 3000

CMD ["yarn", "dev"]
