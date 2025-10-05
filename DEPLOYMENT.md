# Deployment Guide

This document describes how to set up the automated deployment pipeline for MCP GPT Expert.

## Prerequisites

- Ubuntu 24.04 Desktop
- Node.js 20+
- systemd user service support
- GitHub CLI (`gh`)

## Setup Instructions

### 1. GitHub Actions Self-Hosted Runner

The runner has been downloaded and configured in `~/actions-runner`.

**Complete the setup by running these commands:**

```bash
cd ~/actions-runner
sudo ./svc.sh install $USER
sudo ./svc.sh start
```

Verify the runner is online in GitHub Settings → Actions → Runners

### 2. Configure GitHub Secrets

Add the following secrets in your repository: Settings → Secrets and variables → Actions

- `OPENAI_API_KEY`: Your OpenAI API key
- `SERPER_API_KEY`: Your Serper.dev API key
- `DISCORD_WEBHOOK_URL`: Discord webhook URL for error notifications

### 3. Initial Deployment

The deployment happens automatically when you push to the `main` branch.

Manual deployment steps (if needed):

```bash
# Build the project
npm ci
npm run build

# Create .env file
cp .env.example .env
# Edit .env and add your API keys

# Install systemd service
mkdir -p ~/.config/systemd/user
cp systemd/mcp-gpt-expert.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable mcp-gpt-expert
systemctl --user start mcp-gpt-expert
```

### 4. Verify Deployment

```bash
# Check service status
systemctl --user status mcp-gpt-expert

# View logs
journalctl --user -u mcp-gpt-expert -f

# Test the service (from Claude Code)
# Add to your Claude Code configuration:
# {
#   "mcpServers": {
#     "gpt-expert": {
#       "command": "node",
#       "args": ["/home/shogo/prog/mcp-gpt-expert/dist/index.js"]
#     }
#   }
# }
```

## Deployment Workflow

1. Push code to `main` branch
2. GitHub Actions triggers on self-hosted runner
3. Runner builds the project
4. Runner generates `.env` from GitHub Secrets
5. Runner installs/updates systemd service
6. Service automatically restarts
7. Deployment status reported in GitHub Actions

## Troubleshooting

### Service won't start

```bash
# Check logs for errors
journalctl --user -u mcp-gpt-expert -n 50

# Verify .env file exists and has correct values
cat /home/shogo/prog/mcp-gpt-expert/.env

# Manually test the server
cd /home/shogo/prog/mcp-gpt-expert
node dist/index.js
```

### Runner offline

```bash
# Check runner status
cd ~/actions-runner
sudo ./svc.sh status

# Restart runner
sudo ./svc.sh restart
```

### Build failures

Check the GitHub Actions logs in the repository's Actions tab.

## Uninstalling

```bash
# Stop and disable service
systemctl --user stop mcp-gpt-expert
systemctl --user disable mcp-gpt-expert

# Remove service file
rm ~/.config/systemd/user/mcp-gpt-expert.service
systemctl --user daemon-reload
```
