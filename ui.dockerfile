FROM denoland/deno:alpine-2.1.10 AS build

# Required for Coolify healthcheck
RUN apk add --no-cache wget

WORKDIR /

COPY . .

# Build
RUN deno task ui:build

# Nginx Static Web Server
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
