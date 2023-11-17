FROM node:18-alpine AS base

ENV APP_NAME=auth

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune $APP_NAME --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
# Install dependencies
COPY --from=builder /app/out/pnpm-lock.yaml* /app/out/pnpm-workspace.yaml*  ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile



# Build the project and its dependencies
COPY --from=builder /app/out/full/ app/
COPY turbo.json turbo.json

RUN pnpm run build --filter=$APP_NAME

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/$APP_NAME/dist/index.js
