FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json properties.yml ./
COPY src ./src
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production CONFIG_FILE=properties.yml
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY properties.yml ./properties.yml
EXPOSE 3000
CMD ["node", "dist/main.js"]
