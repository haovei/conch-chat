FROM oven/bun:1 AS base
LABEL maintainer="haovei@gmail.com"

WORKDIR /app

FROM base AS builder
COPY . .
RUN bun install
RUN bun run build

FROM base AS runner
COPY --from=builder /app/dist /app/dist
# COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/bun.lockb /app/bun.lockb
RUN bun install --production

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]
