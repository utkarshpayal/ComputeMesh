
# ComputeMesh

ComputeMesh is a peer-to-peer distributed compute platform that enables users to execute workloads on remote machines contributed by providers.

The platform allows providers to share CPU/GPU resources while users can start compute sessions, run workloads inside isolated containers, and interact with them through a real-time terminal or web interface.

ComputeMesh demonstrates infrastructure engineering concepts such as distributed scheduling, container orchestration, peer-to-peer networking, and edge compute resource sharing.

---

# Project Vision

The goal of ComputeMesh is to create a distributed compute network where machines across the internet can contribute compute power and users can run workloads on those machines securely.

Instead of relying only on centralized cloud infrastructure, ComputeMesh coordinates independent nodes into a compute mesh.

---

# Key Features

## Distributed Compute Network
Machines running the ComputeMesh node agent can contribute CPU/GPU resources to the network.

## Containerized Workloads
All user workloads run inside isolated Docker containers with strict resource limits.

## Peer-to-Peer Connectivity
Users connect directly to provider nodes for terminal access and web application routing.

## Compute Marketplace
Users can browse available compute resources and start sessions on selected nodes.

## Job Scheduling
A scheduler assigns workloads to the most suitable node based on resource availability, reliability, and price.

## Provider Earnings
Providers earn rewards based on compute runtime and resource usage.

---

# System Architecture

<img width="236" height="742" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/f90c9a4d-a547-4e0e-a78a-2dce6878e940" />

---

# Component Overview

## API Gateway
Handles authentication, request validation, and routes API calls to internal services.

## Scheduler Service
Selects the most suitable node based on:
- available CPU/GPU
- memory
- reliability score
- pricing

## Session Manager
Responsible for:
- compute session lifecycle
- container startup and termination
- connection key generation

## Node Registry
Maintains metadata about provider nodes including:
- resources
- availability
- uptime
- reliability score

## Node Agent
Runs on provider machines and performs:
- node registration
- resource monitoring
- container management
- job execution
- P2P communication

---

# Container Lifecycle

1. User starts compute session
2. Scheduler selects node
3. Node agent launches Docker container
4. User connects to container terminal
5. Workload executes
6. Session ends
7. Container is destroyed

---

# Example Use Cases

- Machine learning model training
- Distributed rendering
- Development environments
- Data processing workloads
- Remote container execution

---

# Tech Stack

Backend
- Node.js
- Express / Fastify
- MongoDB
- Redis

Compute Layer
- Docker containers

Networking
- P2P transport layer (Holepunch or WebRTC)

Frontend
- React
- TailwindCSS

---

# Resume Description

ComputeMesh – Distributed Compute Platform

- Designed a peer-to-peer compute platform enabling users to run workloads on remote machines.
- Built a node agent for resource discovery and containerized execution using Docker.
- Implemented distributed job scheduling and node reliability scoring.
- Developed P2P networking layer for terminal access and web application tunneling.

---

# Future Improvements

- Multi-node distributed workloads
- GPU cluster orchestration
- WebRTC transport layer
- Provider reputation system
- Automated resource scaling

---

# License

MIT License
