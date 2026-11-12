# CreativeTrust: Next.js + Payload CMS.
#
# Built in GitHub Actions (.github/workflows/deploy.yml) without database access:
# CMS pages render on request, so the build never reads content.
#
#   runner (default)  the site + /admin; runs pending DB migrations on start
#   tools             full source + node_modules, for one-off Payload commands
#                     (the Sanity import, creating migrations) — see DEPLOY.md

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM deps AS tools
COPY . .
ENV MEDIA_DIR=/app/media
CMD ["npm", "run", "payload", "--", "--help"]

FROM tools AS builder
# Payload refuses to start without a secret; the build never connects to anything.
RUN PAYLOAD_SECRET=build-only DATABASE_URL= npm run build

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    MEDIA_DIR=/app/media

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Uploads and the Next.js data cache live on volumes (docker-compose.yml).
RUN mkdir -p /app/media /app/.next/cache && chown -R nextjs:nodejs /app/media /app/.next

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1
CMD ["node", "server.js"]
