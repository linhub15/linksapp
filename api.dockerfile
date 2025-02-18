FROM denoland/deno:alpine-2.1.10

# Required for Coolify healthcheck  
RUN apk add --no-cache wget

WORKDIR /

COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache api/main.ts

# The port that your application listens to.
EXPOSE 8000

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "api/main.ts"]