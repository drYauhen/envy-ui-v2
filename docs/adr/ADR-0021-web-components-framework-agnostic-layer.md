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
Envy UI v2 is built with a **long-term perspective**: all architectural and design decisions must be **technology-agnostic and future-proof**. Business and design decisions should not be tied to any specific technology stack and should not become obsolete when that stack evolves or is replaced.

To further validate the framework-agnostic nature of the system and demonstrate that tokens can project into **any** runtime environment, we are exploring **Web Components** as an additional implementation layer. This is a **long-term proof of concept** that:

1. Proves that the token system is truly technology-agnostic and will survive technology stack changes
2. Ensures design decisions are decoupled from implementation frameworks
3. Enables component usage in any framework (React, Vue, Angular) or vanilla JavaScript, now and in the future
4. Provides a standard-based solution (W3C standards) that doesn't require framework-specific wrappers
5. Demonstrates that the system's architecture is built for longevity, not tied to current technology trends
6. Validates that design tokens and component contracts outlive any specific implementation layer

**Long-term Vision:**
This exploration is not a short-term goal but a **strategic validation** that Envy UI v2's architecture can adapt to future technology changes. If React or any other framework becomes obsolete, the design system's core (tokens, contracts, design decisions) remains intact and can be projected into new implementation layers.

---

## Decision

I decided to **explore Web Components as a long-term proof-of-concept implementation layer** for Envy UI v2, starting with a proof-of-concept implementation of a simple component (e.g., Button).

**Scope (Long-term Proof-of-Concept):**
- **Status:** Long-term strategic validation, not short-term tactical solution
- **Goal:** Validate that Envy UI v2's architecture is truly technology-agnostic and can survive technology stack changes
- **Approach:** Start with one component (Button) to establish patterns and prove the concept
- **Timeline:** Long-term validation of architectural principles, not immediate production requirement
- **Philosophy:** This exploration ensures that design decisions and tokens are decoupled from any specific technology stack, protecting the system's longevity

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

**5. Proof of Architectural Flexibility and Long-term Viability**
- Demonstrates that tokens are the true source of truth, independent of any technology stack
- Shows that implementation layers are projections, not transformations
- Validates the renderer-agnostic model (ADR-0015)
- Strengthens the system's positioning as a universal, long-term design system
- **Proves future-proofing:** If React or any framework becomes obsolete, the design system survives
- **Ensures design decisions are preserved:** Business and design choices are not lost when technology stacks change

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
Web Components are seeing **significant adoption by major technology companies** for design systems, demonstrating this is an established industry trend, not an experimental approach:

- **Microsoft** — [FAST (Fluent UI Web Components)](https://github.com/microsoft/fast), used in Microsoft 365 and Teams. Production-ready design system built entirely on Web Components.
- **Adobe** — [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/), official Web Components implementation of Adobe Spectrum design system.
- **Salesforce** — [Lightning Web Components](https://developer.salesforce.com/docs/component-library/documentation/en/lwc), core of the Salesforce platform, powering millions of enterprise applications.
- **Google** — [Material Web Components](https://github.com/material-components/material-web), official Material Design implementation on Web Components.
- **Shopify** — [Polaris Web Components](https://polaris.shopify.com/), exploring Web Components as part of their design system strategy.

This demonstrates that Web Components are a **viable, enterprise-grade solution** for design systems, validated by industry leaders. By adopting Web Components, Envy UI v2 aligns with established industry practices and follows the same architectural patterns used by major technology companies.

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
- Can implement keyboard navigation using established WAI-ARIA patterns
- All major Web Components design systems (Microsoft FAST, Adobe Spectrum, Salesforce Lightning) successfully implement full accessibility
- Implementation follows WAI-ARIA Authoring Practices Guide, the same standard used by React Aria
- While more manual than React Aria, this approach is proven and widely adopted in the industry

### Implementation Considerations

**1. Accessibility Implementation**
- React Aria is React-specific and cannot be used in Web Components
- **Industry-standard approach:** Implement accessibility using WAI-ARIA Authoring Practices Guide (the same standard React Aria follows)
- **Proven in production:** All major Web Components design systems (Microsoft FAST, Adobe Spectrum, Salesforce Lightning) successfully implement full accessibility using this approach
- **Solution:** Follow established WAI-ARIA patterns, same as industry leaders
- **Note:** While more manual than React Aria, this is the standard approach used across all Web Components implementations

**2. Shadow DOM Event Handling**
- Events from Shadow DOM are isolated by default (by design, for encapsulation)
- **Standard solution:** Use `composed: true` for events that need to bubble (e.g., `click`)
- This is a well-documented pattern used across all Web Components implementations

**3. SSR Considerations**
- Shadow DOM requires JavaScript to render
- **Modern solution:** Declarative Shadow DOM provides SSR support (growing browser support)
- **Fallback:** For static HTML+CSS use cases, HTML+CSS layer remains the solution (as intended in our layered architecture)

**4. Framework Integration**
- Some frameworks (especially React) require specific patterns for Web Components integration
- **Industry practice:** This is expected and well-documented — Web Components are framework-agnostic by design
- Major companies successfully integrate Web Components with React, Vue, Angular in production

**5. Industry Alignment**
- Web Components are **established standard** for framework-agnostic design systems
- **Proven track record:** Used in production by Microsoft, Adobe, Salesforce, Google
- **Growing ecosystem:** Active development, improving tooling, and expanding community
- **For our use case:** Aligning with industry leaders validates our framework-agnostic architecture approach

---

## Consequences

### Benefits

**Architectural Validation:**
- Proves that token system is truly universal and technology-agnostic
- Demonstrates that implementation layers are projections, not transformations
- Strengthens the system's positioning as framework-agnostic and future-proof
- **Long-term value:** Validates that design decisions and tokens will survive technology stack changes
- **Strategic investment:** Ensures the design system is not tied to any specific technology stack

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
- Must implement ARIA and keyboard navigation using WAI-ARIA patterns (same standard as React Aria)
- **Industry-standard approach:** This is how all major Web Components design systems implement accessibility
- More manual work than React Aria, but follows proven industry patterns

**Framework Integration:**
- Some frameworks require specific integration patterns (well-documented)
- React requires special handling for events and props (standard practice)
- **Proven in production:** Major companies successfully integrate Web Components with all major frameworks

**SSR Considerations:**
- Shadow DOM requires JavaScript (by design)
- Declarative Shadow DOM provides modern SSR solution (growing support)
- **Layered architecture benefit:** HTML+CSS layer remains the solution for static/SSR use cases (as intended)

**Maintenance:**
- Additional implementation layer to maintain
- Different accessibility patterns than React Aria (but same WAI-ARIA standard)
- **Strategic value:** Demonstrates universality and aligns with industry leaders

### Next Steps (Long-term Proof-of-Concept)

**Note:** This is a **long-term strategic validation**, not a short-term tactical solution. The goal is to prove that Envy UI v2's architecture can survive technology stack changes and that design decisions are preserved independently of implementation frameworks.

1. **Proof-of-Concept Implementation:**
   - Implement `eui-button` as a Web Component
   - Validate token consumption via CSS custom properties
   - Test context/theme reading from parent elements
   - Verify Shadow DOM style encapsulation
   - **Purpose:** Prove that design tokens and contracts work independently of React/TypeScript stack

2. **Pattern Establishment:**
   - Document how tokens flow into Shadow DOM
   - Establish context/theme reading patterns
   - Create accessibility implementation guidelines
   - Define component API conventions
   - **Purpose:** Create reusable patterns that validate long-term architecture viability

3. **Storybook Integration:**
   - Add "Web Components" section to Storybook navigation
   - Create stories demonstrating Web Component usage
   - Show framework-agnostic nature (React, Vue, vanilla JS examples)
   - **Purpose:** Demonstrate that the design system works across technology boundaries

4. **Documentation:**
   - Document Web Component implementation patterns
   - Explain differences from React Aria layer
   - Provide integration guides for different frameworks
   - **Purpose:** Preserve knowledge and patterns for future technology transitions

### Future Considerations

**Long-term Strategic Value:**
This proof-of-concept serves a **strategic purpose beyond immediate production needs**:
- Validates that design decisions and tokens are preserved independently of technology stacks
- Ensures the design system can adapt to future technology changes
- Proves that business and design choices are not lost when frameworks evolve or are replaced
- Demonstrates architectural longevity and future-proofing

**If Successful (Beyond Proof-of-Concept):**
- Expand to more components (Select, Input, etc.) as needed
- Consider using Constructable Stylesheets for performance
- Explore Declarative Shadow DOM for SSR
- Create framework-specific wrappers if needed (e.g., React wrapper for Web Components)
- **Strategic benefit:** Provides a migration path if React or current stack becomes obsolete

**If Not Pursued Further:**
- This ADR serves as a record of architectural validation
- Proof-of-concept validates the principle even if not fully implemented
- **Key achievement:** Proves that the architecture is technology-agnostic and future-proof
- No impact on existing layers (HTML+CSS, TSX, TSX+React Aria) — they continue to work

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

