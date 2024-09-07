FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN npx turbo prune client --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
RUN npm i -g serve

COPY --from=builder /app/out/full/ .

RUN npx turbo run build --filter=client...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 serve
USER serve

COPY --from=installer --chown=serve:nodejs /app .

EXPOSE 8080

CMD ["npx", "serve", "-s", "apps/client/dist", "-l", "8080"]
