# [Process/Task] Workflow

**Document ID:** workflow-workflow
**Status:** Template
**Date:** 2026-04-04
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Workflow

---
## Overview

### Purpose
[Brief description of what this workflow accomplishes and why it's needed.]

### Scope
[What activities, systems, or components does this workflow cover? What is explicitly NOT covered?]

### Target Audience
[Who should use this workflow? Developers, DevOps, QA, Product team, etc.]

## Prerequisites

### Required Knowledge
[List knowledge or skills needed to execute this workflow.]

### Required Tools
[List software, tools, and accounts needed.]

- Tool 1: [version, purpose]
- Tool 2: [version, purpose]
- Account: [what account and permissions needed]

### Required Environment
[What environment setup is needed? Development, staging, production, etc.]

### Required Access
[What systems, repositories, or services need access to?]

## Workflow Steps

### Phase 1: Preparation
[Describe preparation steps, setup, and validation.]

#### Step 1.1: [Step Name]
**Command/Actions:**
```bash
# Example command
command --option value
```

**Expected Output:**
[What should happen when successful]

**Verification:**
[How to verify this step completed successfully]

#### Step 1.2: [Step Name]
[Continue with detailed steps...]

### Phase 2: Execution
[Describe main workflow execution steps.]

#### Step 2.1: [Step Name]
**Command/Actions:**
```bash
# Example commands
command1
command2 --flag
```

**Expected Output:**
[What should be visible]

**Verification:**
[How to confirm success]

### Phase 3: Validation
[Describe validation and testing steps.]

#### Step 3.1: [Step Name]
**Test Commands:**
```bash
# Validation commands
test --command
verify --output
```

**Success Criteria:**
[What indicates successful completion]

### Phase 4: Completion
[Describe cleanup, notification, and handoff steps.]

#### Step 4.1: [Step Name]
**Actions:**
[Final steps, notifications, documentation updates]

## Validation Checklist

- [ ] [Validation item 1]
- [ ] [Validation item 2]
- [ ] [Validation item 3]
- [ ] [Validation item 4]
- [ ] If this workflow upgrades dependencies/tooling, add a dated migration log in `docs/migrations/`

## Success Metrics

### Quantitative Metrics
- [Metric 1]: [Target value, measurement method]
- [Metric 2]: [Target value, measurement method]

### Qualitative Metrics
- [Quality check 1]: [How to evaluate]
- [Quality check 2]: [How to evaluate]

## Troubleshooting

### Common Issues

#### Issue 1: [Problem Description]
**Symptoms:**
[What indicates this problem]

**Root Cause:**
[Why this happens]

**Solution:**
[Step-by-step fix]

**Prevention:**
[How to avoid in future]

#### Issue 2: [Problem Description]
**Symptoms:**
[What indicates this problem]

**Root Cause:**
[Why this happens]

**Solution:**
[Step-by-step fix]

### Getting Help

**For urgent issues:**
- Contact: [person/team/channel]
- Escalation path: [who to contact next]

**For non-urgent issues:**
- Documentation: [where to find help]
- Discussion: [channel/forum for questions]

## Rollback Procedure

### When to Rollback
[Conditions that trigger rollback]

### Rollback Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Validation After Rollback
[How to verify rollback was successful]

## Related Documentation

### Prerequisites
- [Link to required knowledge docs]
- [Link to tool setup guides]

### Related Workflows
- [Link to related workflow docs]
- [Link to dependent processes]

### Reference Materials
- [Link to specifications]
- [Link to external documentation]

**Link behavior rule:** Write links as normal relative source paths (do not hardcode Storybook URLs). Internal registered `.md` docs open in the current Storybook tab. Code-file links (`.ts/.tsx/.js/.mjs/.css/.json`) open via Source File Viewer in a new tab. External or unregistered links open in a new tab with external-link indicator.

## Change History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| YYYY-MM-DD | 1.0 | Initial version | [Author] |
