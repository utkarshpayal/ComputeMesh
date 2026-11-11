# ComputeMesh

ComputeMesh is a peer-to-peer distributed compute platform in which providers contribute CPU/GPU machines and users run workloads on them inside isolated Docker containers.

This repository contains the **backend API** (`computemesh-backend`): a TypeScript Express service backed by MongoDB that handles user accounts, provider and node registration, node heartbeats, and GPU-based job scheduling. The node agent, P2P transport, session manager, billing and frontend described in the vision below are **not implemented in this repo yet** — see [`architecture.md`](architecture.md) and [`development-roadmap.md`](development-roadmap.md) for the plan.

---

## Project vision

Instead of relying only on centralized cloud infrastructure, ComputeMesh coordinates independent nodes into a compute mesh:

- **Distributed compute network** — machines running a node agent contribute CPU/GPU resources.
- **Containerized workloads** — user workloads run in Docker containers with resource limits.
- **Peer-to-peer connectivity** — users connect directly to provider nodes for terminal access and web app routing.
- **Compute marketplace** — users browse available nodes and start sessions.
- **Job scheduling** — workloads are assigned to the most suitable node by resources, reliability and price.
- **Provider earnings** — providers are paid for runtime and resource usage.

<img width="236" height="742" alt="ComputeMesh architecture diagram" src="https://github.com/user-attachments/assets/f90c9a4d-a547-4e0e-a78a-2dce6878e940" />

Planned container lifecycle: user starts a session → scheduler selects a node → node agent launches a container → user connects to the container terminal → workload runs → session ends → container is destroyed.

---

## What is implemented

| Area | Status in this repo |
| --- | --- |
| Auth (register, login, current user) with JWT + bcrypt | Implemented |
| Provider registration (`providerName`, `location`, `publicIp`) | Implemented |
| Node registration (GPU model/count, VRAM, CPU, RAM, disk, price per hour) | Implemented |
| Node heartbeat (marks node online, updates available GPUs / running jobs) | Implemented |
| Available-node listing (online nodes with free GPUs) | Implemented |
| Job submission + scheduling | Implemented — picks the cheapest online node with enough free GPUs and reserves them |
| `ComputeSession` model (image, ports, env, cost, websocket/SSH URLs) | Model only, no routes |
| Node agent, Docker execution, P2P transport, terminal streaming, billing, reliability scoring, frontend | Planned |

## Tech stack

- Node.js 20, TypeScript
- Express 5, `helmet`, `cors`, `morgan`
- MongoDB via Mongoose
- `jsonwebtoken`, `bcryptjs`
- `ts-node-dev` for development

## API

All routes are JSON. Protected routes expect `Authorization: Bearer <token>` (the token returned by `/auth/login`).

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | — | Health check |
| POST | `/auth/register` | — | Body: `name`, `email`, `password` |
| POST | `/auth/login` | — | Body: `email`, `password`; returns a JWT |
| GET | `/auth/me` | Yes | Current user |
| POST | `/providers/register` | Yes | Register the current user as a provider |
| GET | `/providers/me` | Yes | Current user's provider profile |
| POST | `/nodes/register` | Yes (provider) | Register a node; returns a generated `nodeId` |
| POST | `/nodes/heartbeat` | — | Body: `nodeId`, `availableGPUs`, `runningJobs` |
| GET | `/nodes/available` | — | Online nodes with free GPUs |
| POST | `/jobs/submit` | Yes | Body: `dockerImage`, `command`, `requiredGPUs`, `requiredRAM`, `requiredCPU` |

## Getting started

### Prerequisites

- Node.js 20+
- A MongoDB instance

### Install and run

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # ts-node-dev with auto-reload
```

Production build:

```bash
npm run build          # tsc → dist/
npm start              # node dist/server.js
```

The server listens on `PORT` (default `5000`).

## Configuration

Environment variables (see `.env.example`):

| Variable | Description |
| --- | --- |
| `PORT` | HTTP port (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs. Set this in every environment — the code falls back to an insecure default if it is missing. |
| `NODE_ENV` | Runtime environment |

## Scripts

| Script | Command |
| --- | --- |
| `npm run dev` | `ts-node-dev --respawn --transpile-only server.ts` |
| `npm run build` | `tsc` |
| `npm start` | `node dist/server.js` |

No test script is defined.

## Deployment

- **AWS CodeBuild** — `buildspec.yml` installs dependencies and runs `npm run build` on Node.js 20.
- **AWS CodeDeploy** — `appspec.yml` copies the build to the instance and runs the hooks in `scripts/` (`before_install.sh`, `after_install.sh`, `application_start.sh`, `application_stop.sh`), which install, build and run `dist/server.js` under PM2 as `computemesh-be`.
- **Docker** — a `Dockerfile` (Node 20 Alpine, exposes `5000`) is included, but its `CMD` runs `index.js`, which does not exist; it needs updating (e.g. to build and run `dist/server.js`) before use (needs confirmation).

## Project structure

```
server.ts              Entry point: loads env, connects to MongoDB, starts Express
src/app.ts             Express app, middleware and route mounting
src/config/db.ts       Mongoose connection
src/routes/            auth, providers, nodes, jobs
src/controllers/       Request handlers
src/services/          Business logic, incl. scheduler.service.ts
src/models/            User, Provider, Node, Job, ComputeSession
src/middlewares/       JWT auth and error handling
scripts/               CodeDeploy lifecycle hooks
architecture.md        Planned architecture checklist
development-roadmap.md 3-month development roadmap
```

## License

The previous README stated MIT, while `package.json` declares ISC and there is no LICENSE file (needs confirmation).
