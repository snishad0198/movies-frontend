FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Dependencies
COPY package*.json ./
RUN npm install

# Source files
COPY . .

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner
EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
