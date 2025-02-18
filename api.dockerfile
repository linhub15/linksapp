FROM denoland/deno:alpine-2.1.10

# The port that your application listens to.
EXPOSE 8000

WORKDIR /


# These steps will be re-run upon each file change in your working directory:
COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache api/main.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "api/main.ts"]