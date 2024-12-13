# Linktree Clone

An over architected clone of linktree to showcase systems design and bleeding
edge technology.

Uses [Deno 2](https://deno.com/).

## Dev

- start the db `deno task db`
- start the api `deno task api`
- start the ui `deno task ui`
- update db schema `deno task drizzle push`

View the db with https://libsqlstudio.com

### Buzzwords

- Hexagonal, Clean Architecture, Screaming Architecture
- RESTful API
- DB ORM
- Monorepo
- Integration Tests
- Errors as values
- OAuth2 PKCE

### Backend Tech

- Hono
- Zod
- Drizzle ORM
- Turso LibSQL (sqlite)
- tRPC server

### Frontend Tech

- Vite + React
- tRPC client
- Tanstack Query
- Tanstack Form
- Tanstack Router
- Tailwind v4
- Tailwindlabs - Catalyst UI Kit

#### Features

- POST endpoint to submit forms
- email notification

### Devops, CI/CD

## Setup

- Install deno
- Install turso cli
- Setup environment variables for `api` with `cp ./api/.env/example ./api/.env`
