# ADR-0021: Web Components as Framework-Agnostic Implementation Layer

**Status:** Exploratory  
**Date:** 2025-01-XX  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- ADR-0001 — React Aria as Headless Accessibility Foundation  
- ADR-0012 — Button Evolution, Layered Architecture and Contexts  
- ADR-0015 — Token-First Contract Layer and Renderer-Agnostic Model  
- ADR-0017 — Layered Token Architecture for Contexts and Themes

---

## Context

Envy UI v2 is designed as a **token-driven, framework-agnostic design system** with multiple implementation layers:

- **HTML + CSS** — Static baseline, no JavaScript
- **TSX Clean** — React/TypeScript without accessibility logic
- **TSX + React Aria** — React with accessibility engine

The system's core principle is **token-first architecture**: design tokens (DTCG format) are the single source of truth, and multiple implementation layers project these tokens into different runtime environments.

**Current State:**
- Tokens drive all visual decisions
- Context/Theme system works via CSS custom properties and `[data-eui-context]` / `[data-eui-theme]` attributes
- Components are renderer-agnostic at the contract level
- Multiple layers demonstrate universality of the token system

**Motivation:**
To further validate the framework-agnostic nature of the system and demonstrate that tokens can project into **any** runtime environment, we are exploring **Web Components** as an additional implementation layer. This would:

1. Prove that the token system is truly technology-agnostic
2. Enable component usage in any framework (React, Vue, Angular) or vanilla JavaScript
3. Provide a standard-based solution that doesn't require framework-specific wrappers
4. Demonstrate the system's architectural flexibility for presentations and demos

---

## Decision

I decided to **explore Web Components as an experimental implementation layer** for Envy UI v2, starting with a proof-of-concept implementation of a simple component (e.g., Button).

**Scope (Exploratory Phase):**
- **Status:** Early-stage analysis and proof-of-concept
- **Goal:** Validate that Web Components can consume Envy UI v2 tokens and context/theme system
- **Approach:** Start with one component (Button) to establish patterns
- **Timeline:** Exploratory, not production-ready

**Key Requirements:**
1. Web Components must consume CSS custom properties (tokens) from the parent context
2. Context/Theme system must work via `[data-eui-context]` and `[data-eui-theme]` attributes
3. Shadow DOM encapsulation should not break token inheritance
4. Components should work in any framework or vanilla JavaScript
5. Accessibility must be maintained (native ARIA or alternative to React Aria)

**Implementation Strategy:**
- Use **Custom Elements v1** (standard, widely supported)
- Use **Shadow DOM v1** for style encapsulation
- Leverage **CSS custom properties** that penetrate Shadow DOM boundaries
- Read context/theme from parent elements via `closest('[data-eui-context]')`
- Implement accessibility using native ARIA attributes (React Aria is React-specific)

---

## Rationale

### Why Web Components Fit the Architecture

**1. Alignment with Token-First Philosophy**
- CSS custom properties **penetrate Shadow DOM boundaries** by design
- Tokens defined at the document level automatically flow into Shadow DOM
- No special bridging needed — the existing token system works as-is

**2. Framework-Agnostic Nature**
- Web Components are a **W3C web standard** (not a library or framework)
- Officially standardized by the World Wide Web Consortium
- Can be used in React, Vue, Angular, Svelte, or vanilla JavaScript
- Demonstrates that Envy UI v2 is truly technology-agnostic
- No framework-specific wrappers required
- Long-term stability guaranteed by web standards

**3. Style Encapsulation Benefits**
- Shadow DOM provides true style isolation
- Prevents CSS conflicts in complex applications
- Still allows token inheritance via CSS custom properties
- Matches the design system's goal of predictable, isolated components

**4. Context/Theme Compatibility**
- `[data-eui-context]` and `[data-eui-theme]` attributes work on any element
- Web Components can read parent context via `closest('[data-eui-context]')`
- CSS custom properties cascade through Shadow DOM
- Same mechanism as HTML+CSS and TSX layers

**5. Proof of Architectural Flexibility**
- Demonstrates that tokens are the true source of truth
- Shows that implementation layers are projections, not transformations
- Validates the renderer-agnostic model (ADR-0015)
- Strengthens the system's positioning as a universal design system

### Current State of Web Components (2024-2025)

**W3C Standard Status:**
- Web Components are an **official W3C web standard**, not a library or framework
- Custom Elements and Shadow DOM are part of the HTML Living Standard
- Standards are stable, mature, and production-ready
- Long-term browser support guaranteed by web standards process

**Browser Support:**
- **Custom Elements v1:** Stable, supported in all modern browsers
- **Shadow DOM v1:** Stable, supported in all modern browsers
- **Constructable Stylesheets:** Growing support (Chrome, Firefox, Safari)
- **Declarative Shadow DOM:** Growing support (for SSR)
- No polyfills needed for modern browsers

**Industry Adoption:**
Web Components are seeing growing adoption by major technology companies for design systems:

- **Microsoft** — FAST (Fluent UI Web Components), used in Microsoft 365 and Teams
- **Adobe** — Spectrum Web Components, official Web Components implementation of Adobe Spectrum
- **Salesforce** — Lightning Web Components, core of the Salesforce platform
- **Google** — Material Web Components, official Material Design implementation
- **Shopify** — Polaris Web Components (exploratory/early stage)

This demonstrates that Web Components are a viable, enterprise-grade solution for design systems, not just an experimental technology.

**Ecosystem:**
- Active ecosystem with libraries like Lit, Stencil, and others
- However, vanilla Web Components (without libraries) are sufficient for our proof-of-concept
- Growing community and resources for Web Components development

### Technical Feasibility

**Token Integration:**
```css
/* CSS custom properties automatically penetrate Shadow DOM */
:host {
  background: var(--eui-button-bg-base);
  color: var(--eui-button-label-base);
}
```

**Context/Theme Reading:**
```javascript
// Web Component can read context from parent
const context = this.closest('[data-eui-context]')?.getAttribute('data-eui-context');
const theme = this.closest('[data-eui-theme]')?.getAttribute('data-eui-theme');
```

**Accessibility:**
- Native ARIA attributes work in Shadow DOM
- Can implement keyboard navigation manually
- **Important:** There is **no direct equivalent to React Aria** for Web Components
- Must implement accessibility patterns manually using WAI-ARIA Authoring Practices Guide
- This is a significant trade-off compared to React Aria layer

### Challenges and Considerations

**1. React Aria Incompatibility and Accessibility Implementation**
- React Aria is React-specific and cannot be used in Web Components
- **No direct equivalent exists:** There is no comprehensive accessibility library like React Aria for Web Components
- **Available options:**
  - Manual implementation using WAI-ARIA Authoring Practices Guide
  - Lit provides some utilities, but not a full accessibility framework
  - Some component libraries (Vaadin, Shoelace) have accessibility built-in, but these are full components, not utility libraries
- **Solution:** Implement accessibility using native ARIA attributes and manual keyboard handling
- **Impact:** Significantly more work than React Aria layer, but acceptable for proof-of-concept demonstrating framework-agnostic nature
- **Trade-off:** Framework-agnostic nature comes with the cost of manual accessibility implementation

**2. Shadow DOM Event Handling**
- Events from Shadow DOM are isolated by default
- **Solution:** Use `composed: true` for events that need to bubble (e.g., `click`)

**3. SSR Considerations**
- Shadow DOM requires JavaScript to render
- **Solution:** Use Declarative Shadow DOM for SSR (growing browser support)
- For static HTML+CSS use cases, HTML+CSS layer remains the solution

**4. Framework Integration**
- Some frameworks (especially React) have quirks with Web Components
- **Solution:** This is expected and acceptable — Web Components are meant to be framework-agnostic, not framework-optimized

**5. Industry Maturity and Future Outlook**
- Web Components are **not yet mainstream** for complex SPA applications
- They are **growing in adoption** for design systems and component libraries
- **Current state (2024-2025):**
  - Growing adoption by major companies for design systems (Microsoft, Adobe, Salesforce, Google)
  - Not replacing React/Vue for application development
  - Best suited for component libraries and framework-agnostic design systems
- **Future outlook:**
  - Likely to continue growing for design systems and micro-frontends
  - May see improved accessibility tooling in the future
  - SSR support improving with Declarative Shadow DOM
  - But React/Vue likely to remain dominant for complex applications
- **For our use case:** This is acceptable — we're using Web Components to demonstrate framework-agnostic architecture, not to replace React for application development

---

## Consequences

### Benefits

**Architectural Validation:**
- Proves that token system is truly universal
- Demonstrates that implementation layers are projections, not transformations
- Strengthens the system's positioning as framework-agnostic

**Practical Benefits:**
- Components can be used in any framework or vanilla JavaScript
- True style encapsulation via Shadow DOM
- No framework-specific dependencies
- Standard-based solution (web standards, not library-specific)

**Presentation/Demo Value:**
- Shows the system's flexibility and universality
- Demonstrates token-driven architecture across multiple runtimes
- Validates the architectural decisions in ADR-0015 and ADR-0017

### Trade-offs

**Accessibility Implementation:**
- Cannot use React Aria (React-specific)
- Must implement ARIA and keyboard navigation manually
- More work than React Aria, but acceptable for proof-of-concept

**Framework Integration Complexity:**
- Some frameworks have quirks with Web Components
- React requires special handling for events and props
- This is expected and acceptable for a framework-agnostic solution

**SSR Limitations:**
- Shadow DOM requires JavaScript
- Declarative Shadow DOM helps but support is still growing
- HTML+CSS layer remains the solution for static/SSR use cases

**Maintenance Overhead:**
- Another implementation layer to maintain
- Different accessibility patterns than React Aria
- But aligns with the goal of demonstrating universality

### Next Steps (Exploratory Phase)

1. **Proof-of-Concept Implementation:**
   - Implement `eui-button` as a Web Component
   - Validate token consumption via CSS custom properties
   - Test context/theme reading from parent elements
   - Verify Shadow DOM style encapsulation

2. **Pattern Establishment:**
   - Document how tokens flow into Shadow DOM
   - Establish context/theme reading patterns
   - Create accessibility implementation guidelines
   - Define component API conventions

3. **Storybook Integration:**
   - Add "Web Components" section to Storybook navigation
   - Create stories demonstrating Web Component usage
   - Show framework-agnostic nature (React, Vue, vanilla JS examples)

4. **Documentation:**
   - Document Web Component implementation patterns
   - Explain differences from React Aria layer
   - Provide integration guides for different frameworks

### Future Considerations

**If Successful (Beyond Exploratory):**
- Expand to more components (Select, Input, etc.)
- Consider using Constructable Stylesheets for performance
- Explore Declarative Shadow DOM for SSR
- Create framework-specific wrappers if needed (e.g., React wrapper for Web Components)

**If Not Pursued:**
- This ADR serves as a record of analysis
- Proof-of-concept can be archived
- No impact on existing layers (HTML+CSS, TSX, TSX+React Aria)

---

## Status

* Document type: **Architecture Decision / Exploratory Analysis**
* Status: **Exploratory** (early-stage analysis, proof-of-concept phase)
* Not a commitment to full implementation
* Subject to validation through proof-of-concept

---

## Notes

This document should:
- Be revisited after proof-of-concept implementation
- Guide decisions about whether to pursue Web Components as a full layer
- Serve as reference for understanding framework-agnostic architecture goals
- Be updated if Web Components layer moves from exploratory to implemented status

