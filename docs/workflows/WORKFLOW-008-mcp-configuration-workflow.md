# MCP Configuration Workflow

**Document ID:** workflow-mcp-configuration-workflow  
**Status:** Active  
**Date:** 2026-04-02  
**Last Updated:** 2026-04-02  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Category:** Workflow

---

This document defines how MCP (Model Context Protocol) configuration is organized in this repository.

## Purpose

- Keep local MCP runtime paths and secrets out of git.
- Provide a stable onboarding template for MCP setup.
- Maintain an explicit inventory of MCP-related configuration used by the project.

## Repository Convention

- Local runtime MCP config file: `.mcp.json` (ignored by git).
- Safe template file: [.mcp.example.json](../../.mcp.example.json) (tracked in git).

## Current MCP Inventory

Based on repository search (`.mcp.json` + docs references), current MCP-related configuration is:

| Server Name | Type | Status | Source |
| :--- | :--- | :--- | :--- |
| `figma-console-local` | Local MCP server (Node script) | Active locally (machine-specific) | `.mcp.json` (ignored) |

Additional notes:
- No cloud MCP server config is tracked in this repository right now.
- ADR references to Figma MCP exist in [ADR-0025](../adr/ADR-0025-figma-variables-integration-strategy.md) and describe forward-looking architecture.

## Setup Steps (Local Machine)

1. Create local config from template:

```bash
cp .mcp.example.json .mcp.json
```

2. Edit `.mcp.json` and set real absolute paths for your machine.

3. If needed, add environment variables in local config only (do not commit secrets/tokens/host-specific values).

## Example Configuration

Canonical tracked example:

```json
{
  "mcpServers": {
    "figma-console-local": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/figma-console-mcp/dist/local.js"
      ]
    }
  }
}
```

## Change Management Rules

- Any new shared MCP integration must be reflected in `.mcp.example.json`.
- Any new MCP-related workflow/decision should be documented in this file and linked from `docs/workflows/README.md`.
- `.mcp.json` remains local-only; do not stage or commit it.

## Validation Checklist

- `.mcp.json` is ignored by `.gitignore`.
- `.mcp.example.json` exists and is up to date.
- Workflow docs include this document in the workflows index.
- If an MCP server is added/removed, inventory table above is updated.
