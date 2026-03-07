# Hyperrcompute Architecture

## Core Components

### Node Agent (Provider Side)
- [ ] Node agent bootstrap
- [ ] Configuration loader
- [ ] Resource detection (CPU, RAM, GPU)
- [ ] Node registration with platform
- [ ] Heartbeat service (every 10 seconds)
- [ ] Resource monitoring service
- [ ] Job execution service
- [ ] Docker container manager
- [ ] Transport layer (Holepunch / P2P)
- [ ] Log streaming module

### Backend Services

#### API Gateway
- [ ] User authentication APIs
- [ ] Node registration endpoint
- [ ] Node heartbeat endpoint
- [ ] Session creation endpoint
- [ ] Session termination endpoint
- [ ] Marketplace listing endpoint

#### Scheduler Service
- [ ] Node selection algorithm
- [ ] Resource matching logic
- [ ] Reliability scoring integration
- [ ] Price-based scheduling logic

#### Session Manager
- [ ] Session creation workflow
- [ ] Container lifecycle control
- [ ] P2P connection key generation
- [ ] Session cleanup logic

#### Node Registry
- [ ] Node database schema
- [ ] Node availability tracking
- [ ] Node resource metadata storage

#### Billing Service
- [ ] Usage tracking
- [ ] Cost calculation logic
- [ ] Provider earnings calculation
- [ ] Commission handling

### Database Models

#### Users
- [ ] userId
- [ ] email
- [ ] passwordHash
- [ ] balance
- [ ] createdAt

#### Nodes
- [ ] nodeId
- [ ] providerId
- [ ] cpu
- [ ] memory
- [ ] gpu
- [ ] pricePerHour
- [ ] status
- [ ] reliabilityScore
- [ ] lastHeartbeat

#### Sessions
- [ ] sessionId
- [ ] userId
- [ ] nodeId
- [ ] containerId
- [ ] status
- [ ] startTime
- [ ] endTime
- [ ] p2pKey

#### UsageLogs
- [ ] sessionId
- [ ] runtime
- [ ] cpuUsage
- [ ] gpuUsage
- [ ] cost

### Networking Layer
- [ ] P2P connection using Holepunch
- [ ] Terminal streaming
- [ ] Web port forwarding
- [ ] Session URL routing
- [ ] Optional relay fallback

### Security
- [ ] CPU limits
- [ ] Memory limits
- [ ] Filesystem isolation
- [ ] Network isolation
- [ ] Container timeout limits
