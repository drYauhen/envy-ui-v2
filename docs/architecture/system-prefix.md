# System Prefix

Definition
- System Prefix is the single canonical prefix for the system (currently `eui`).

Rule
- The token JSON root key must match the System Prefix.
- The token JSON root key must match the System Prefix across all contexts.
- Context token directories (`tokens/app`, `tokens/website`, `tokens/report`) do not match the prefix; they are environment scopes.

Flows
- Semantic flow: token folder structure + JSON root define canonical token paths.
- Runtime flow: CSS variables, data attributes, and class names derive from System Prefix.

Consequences
- Generators may hardcode the root name and assume it matches the System Prefix.
- Runtime layers derive selectors from System Prefix; CSS remains build-time.
- Changing the prefix requires updating the token JSON root key and regenerating all artifacts.
