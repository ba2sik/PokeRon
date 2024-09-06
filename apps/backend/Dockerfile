FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN npx turbo prune backend --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .

RUN npx turbo run build --filter=backend...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express
USER express

COPY --from=installer --chown=express:nodejs /app .

EXPOSE 3000

CMD ["node", "--import=extensionless/register", "apps/backend/dist/index.js"]
