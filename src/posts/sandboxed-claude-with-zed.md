---
title: Sandboxed Claude with Zed
layout: "surround/blog_base.liquid"
date: 2026-04-24
tags: ["post"]
---

Here are my settings for running [claude](https://claude.ai/) in [zed](https://zed.dev/) using the [nono](https://nono.sh/) sandbox.  
This allows me to safely(-ish) run claude and skip the permission checks.

### Setup

```bash
# Install claude-agent-acp
npm i -g @agentclientprotocol/claude-agent-acp

# Find the path to claude-agent-acp for the next step
which claude-agent-acp
```

### Zed Settings

```json
{
  "agent_servers": {
    "Claude Code (sandboxed)": {
      "type": "custom",
      "command": "nono",
      "args": [
        "run",
        "--allow-cwd",
        "--profile",
        "my-claude-code",
        "--",
        "/Users/dan/.local/share/mise/installs/node/22/bin/claude-agent-acp",
      ],
      "default_config_options": {
        "mode": "bypassPermissions",
      },
    },
  }
}
```

### `nono` Profile

This file should be created in `~/.config/nono/profiles/my-claude-code.json`

```json
{
  "meta": {
    "name": "my-claude-code",
    "version": "1.0.0",
    "description": "Claude Code with additional project access"
  },
  "extends": "claude-code",
  "security": {
    "groups": ["git_config"]
  },
  "filesystem": {
    "allow": ["$WORKDIR", "$HOME/.claude", "$HOME/.superset", "$HOME/projects"],
    "read": ["$HOME/.local/share/mise/installs"]
  },
  "network": {
    "block": false
  },
  "env_credentials": {}
}
```

<hr />

To double check it's all working I ask claude to list the files in my home directory - which should be blocked by `nono`.

If you have an issue then try running the full `nono` command in your shell, then you can see the full error message, you will probably need to tweak the paths in your `nono` profile.
