# MCP Configuration Workflow

**Document ID:** workflow-mcp-configuration-workflow  
**Status:** Active  
**Date:** 2026-04-02  
**Last Updated:** 2026-04-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Category:** Workflow

---

This document defines how MCP (Model Context Protocol) configuration is organized in this repository.

## Purpose

- Keep local MCP runtime paths and secrets out of git.
- Provide a stable onboarding template for MCP setup.
- Maintain an explicit inventory of MCP-related configuration used by the project.
- Standardize how new third-party MCP knowledge sources are adopted.

## Repository Convention

- Local runtime MCP config file: `.mcp.json` (ignored by git).
- Safe template file: [.mcp.example.json](../../.mcp.example.json) (tracked in git).

## Current MCP Inventory

Based on repository configuration and documentation, current MCP-related setup is:

| Server Name | Type | Status | Source |
| :--- | :--- | :--- | :--- |
| `react-aria` | External package MCP server (`npx @react-aria/mcp@latest`) | Baseline-enabled | `.mcp.example.json` + local `.mcp.json` |
| `figma-console-local` | Local MCP server (Node script) | Active locally (machine-specific path) | `.mcp.json` (ignored), template in `.mcp.example.json` |

Additional notes:
- `react-aria` MCP is used as a documentation/knowledge access layer for agentic coding workflows.
- Local machine paths and local env overrides remain local-only.
- ADR references to Figma MCP exist in [ADR-0025](../adr/ADR-0025-figma-variables-integration-strategy.md).

## Setup Steps (Local Machine)

1. Create local config from template:

```bash
cp .mcp.example.json .mcp.json
```

2. Edit `.mcp.json` and set real absolute paths for local servers (for example `figma-console-local`).

3. Keep shared package MCP entries (for example `react-aria`) unless there is an explicit local incompatibility.

4. Add environment variables in local config only when required (do not commit secrets/tokens/host-specific values).

## Example Configuration

Canonical tracked example:

```json
{
  "mcpServers": {
    "react-aria": {
      "command": "npx",
      "args": [
        "@react-aria/mcp@latest"
      ]
    },
    "figma-console-local": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/figma-console-mcp/dist/local.js"
      ]
    }
  }
}
```

## MCP Adoption Rule (For New Integrations)

When a dependency ecosystem introduces an agent-facing MCP layer, use this adoption rule:

1. **Detect:** Identify new MCP capabilities during dependency upgrades and release reviews.
2. **Evaluate:** Check relevance for Envy UI workflows (API accuracy, speed, agent usability, maintenance cost).
3. **Adopt baseline:** Add safe shared config to `.mcp.example.json` if value is confirmed.
4. **Document:** Update MCP inventory in this workflow and reference the architectural decision in ADRs.
5. **Validate:** Ensure local setup instructions stay executable and no secrets leak into git.

## Change Management Rules

- Any new shared MCP integration must be reflected in `.mcp.example.json`.
- Any new MCP-related workflow/decision should be documented in this file and linked from `docs/workflows/README.md` and related ADRs.
- `.mcp.json` remains local-only; do not stage or commit it.

## Validation Checklist

- `.mcp.json` is ignored by `.gitignore`.
- `.mcp.example.json` exists and is up to date.
- Workflow docs include this document in the workflows index.
- If an MCP server is added/removed, inventory table above is updated.
