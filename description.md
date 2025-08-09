# Varify — Product Plan

## 🧠 Overview

**Varify** is a developer-first tool for managing, verifying, and syncing environment variables across projects, environments, and teams.  
It integrates directly into the IDE (starting with VS Code) and optionally with a CLI + cloud backend for secure, collaborative secrets management.

**Core Value Prop:**
- No more “out-of-sync” `.env` files
- Instant onboarding for new devs
- Validation to prevent missing or wrong keys
- Optional secure cloud sync

---

## 🎯 Mission

> Make working with `.env` files painless, secure, and collaborative — without leaving your coding environment.

---

## 🛠️ Core Features

### **MVP (Free / Open Source)**
- Syntax highlighting for `.env` files
- Autocomplete from `.env.example`
- Validation: missing, extra, or unused keys
- Diff view between `.env` files (local vs staging, etc.)
- `.env.example` auto-generation
- Git blame + history for keys
- Local multi-env awareness (`.env.dev`, `.env.staging`, `.env.prod`)

### **Cloud Features (Paid)**
- Push `.env` to Varify Cloud
- Pull `.env` from Varify Cloud
- Remote provider sync:
  - GitHub Secrets
  - Doppler
  - AWS SSM
  - Infisical
- End-to-end encryption for secrets
- Audit logs & key history
- Org/team management with RBAC
- Web dashboard for secret management
- CLI for CI/CD usage

---

## 🧩 Monetization Strategy

**Hybrid / Open-Core**

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | All local extension features |
| Pro | $5/mo | Cloud sync, 3 environments, personal usage |
| Team | $15/user/mo | Cloud sync, unlimited environments, team roles, audit logs |
| Enterprise | Custom | SSO, on-prem hosting, SLA, dedicated support |

**Why hybrid?**
- Builds trust via open-source core
- Community can contribute provider integrations
- Paid tier monetizes *sync + team collaboration* (hard to fork + host yourself)

---

## 📦 Product Structure

### 1. **VS Code Extension** (`/vscode-extension`)
- Built in **TypeScript** using the VS Code Extension API
- Commands:
  - `Varify: Validate Env Files`
  - `Varify: Diff Environments`
  - `Varify: Push to Remote`
  - `Varify: Pull from Remote`
- Panel UI for environment list & status
- Tree view for `.env` keys with status icons
- Uses `lib/` for parsing & diffing logic

### 2. **CLI Tool** (`/cli`)
- Node.js CLI (can later be compiled to Go/Rust for speed)
- Commands:
  - `varify push`
  - `varify pull`
  - `varify diff`
  - `varify gen-example`
- Useful in CI/CD

### 3. **Core Library** (`/lib`)
- Env file parser
- Diff generator
- Encryption utilities
- Schema validation engine

### 4. **Cloud Backend** (`/server`) — **Paid**
- FastAPI or Node.js backend
- User authentication (JWT or OAuth)
- E2E encrypted storage of env vars
- Team/org structure
- REST + WebSocket API for sync
- Optional provider integrations (AWS, Doppler, Infisical)


---

## ⚙️ Tech Stack

### **Frontend (IDE UI)**
- Language: TypeScript
- Framework: VS Code API
- UI: Custom panels + tree view

### **Backend (Paid Features)**
- Language: Python (FastAPI) or Node.js (Express/NestJS)
- Database: PostgreSQL
- Secrets Storage: Encrypted blobs in DB
- Auth: JWT, OAuth for GitHub/Doppler/etc.
- Hosting: AWS/GCP/Azure or Railway/Fly.io for MVP
- Encryption: AES-256-GCM with user-specific keys

### **CLI**
- Language: Node.js (later Go for speed)
- Package: Published to npm as `varify`

---

## 🔐 Security Considerations
- Never log secrets
- E2E encryption in Cloud mode
- Local encryption before network transmission
- Role-based permissions for teams
- Option to self-host backend

---

## 🚀 Roadmap

**Phase 1: Local MVP**
- VS Code extension with validation + diff
- CLI for validation
- Open source release

**Phase 2: Basic Cloud**
- Hosted backend for push/pull
- GitHub Secrets integration
- Paid plans start here

**Phase 3: Growth**
- Team RBAC
- More provider integrations
- Marketing on Product Hunt, Reddit, Dev.to

---

## 📈 Go-To-Market Strategy

### Launch Channels
- VS Code Marketplace
- Product Hunt
- Reddit r/webdev, r/devops, r/selfhosted
- Twitter / X dev community
- Hacker News

### Growth Levers
- Content: blog posts on “Best practices for env var management”
- GitHub open-source repo visibility
- Early access for open source maintainers

---

## 📣 Brand Identity

**Logo:** Key with circular sync arrows  
**Colors:**  
- Primary: `#2F80ED` (blue)  
- Accent: `#27AE60` (green)  
- Background: `#1E1E1E` (dark)  
**Font:** JetBrains Mono for code UI, Inter for text

---

## 📜 License

- **Core (extension + CLI)**: Apache 2.0 (open source)
- **Cloud backend**: Proprietary (paid feature)

---

## 📌 Maintainer Notes
- Keep core lean, avoid feature creep in extension
- Paid features must deliver real team value
- Stay developer-first: frictionless setup, instant results

---
