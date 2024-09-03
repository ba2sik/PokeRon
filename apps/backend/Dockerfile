FROM node:20-alpine AS base

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

RUN npm install -g turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=backend

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express
USER express

EXPOSE 3000

CMD ["node", "apps/backend/dist/src/index.js"]