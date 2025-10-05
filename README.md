# MCP GPT Expert

MCP (Model Context Protocol) server that provides expert AI assistance through OpenAI's GPT models and web search capabilities via Serper.dev.

## Overview

This MCP server enables Claude Code and other MCP clients to:
- Ask expert-level questions to GPT models
- Perform web searches through Serper.dev
- (Future) Manage asynchronous job execution

## Technology Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: `@modelcontextprotocol/sdk`
- **AI Provider**: OpenAI API (GPT-4o, GPT-4 Turbo, etc.)
- **Search Provider**: Serper.dev API
- **Deployment**: systemd service on Ubuntu 24.04
- **CI/CD**: GitHub Actions (self-hosted runner)
- **Logging**: Local log files + Discord webhooks (errors only)

## Development Phases

### Phase 1: MVP (Simple Synchronous Version)
- ✅ Basic MCP server setup
- ✅ `ask_expert` tool - synchronous OpenAI API integration
- ✅ `search_web` tool - Serper.dev search integration
- ✅ Automated deployment via GitHub Actions
- ✅ systemd service configuration
- ✅ Logging infrastructure

### Phase 2: Job Management
- Asynchronous job execution system
- Job status tracking (pending, running, completed, failed)
- `get_job_result` tool for retrieving async results
- Job listing and cancellation features

### Phase 3: Optimization & Reliability
- Model selection functionality
- Token usage tracking and cost estimation
- Enhanced error handling and retry logic
- Rate limit handling
- Health check endpoints

## Getting Started

(Setup instructions will be added as development progresses)

## License

MIT
