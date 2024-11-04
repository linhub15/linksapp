# Linktree Clone

An over architected clone of linktree to showcase systems design and bleeding
edge technology.

Uses [Deno 2](https://deno.com/).

## Dev

- start the db `deno task db`
- start the api `deno task api`
- start the ui `deno task ui`

### Buzzwords

- Hexagonal, Clean Architecture, Screaming Architecture
- RESTful API
- DB ORM
- Monorepo
- Integration Tests

### Backend Tech

- Hono
- Zod
- Drizzle ORM
- OpenApi
- Scalar API Docs
- Turso LibSQL (sqlite)

### Frontend Tech

- Vite + React
- Tailwind v4
- Tanstack Query

### Devops, CI/CD

## Setup

- Install deno
- Install turso cli
- Setup environment variables for `api` with `cp ./api/.env/example ./api/.env`
