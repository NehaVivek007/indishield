# Design Brief — IndiShield

**Aesthetic:** Premium legal/financial SaaS. Authoritative, trustworthy, precise. No decoration, no gradients—surfaces defined by borders and elevation only.

**Color Palette**

| Token | Light (OKLCH) | Dark (OKLCH) | Usage |
|-------|---|---|---|
| Primary (Navy) | 0.25 0.025 270 | 0.72 0.08 49 | Headers, sidebar active, primary CTAs |
| Accent (Gold) | 0.68 0.12 48 | 0.72 0.08 49 | Links, highlights, score emphasis, claim strengths |
| Secondary (Muted) | 0.78 0.082 49 | 0.22 0 0 | Supporting text, lighter contexts |
| Background | 1.0 0 0 | 0.135 0 0 | Main canvas |
| Card | 0.98 0 0 | 0.16 0 0 | Lifted surfaces (forms, results, cards) |
| Foreground | 0.18 0 0 | 0.95 0 0 | Body text |
| Muted | 0.92 0 0 | 0.22 0 0 | Disabled, tertiary contexts |
| Border | 0.88 0 0 | 0.25 0 0 | Dividers, input outlines |

**Typography**

| Role | Font | Scale | Weight | Use |
|------|------|-------|--------|-----|
| Display | General Sans | 36–48px | 600 | Page titles, section headers |
| Headline | General Sans | 24–32px | 500–600 | Card headers, form labels |
| Body | General Sans | 16–18px | 400 | Primary reading text, explanations |
| Small | General Sans | 12–14px | 400 | Metadata, supplementary info |
| Mono | Geist Mono | 12–14px | 400 | Code, policy numbers, scores |

**Structural Zones**

| Zone | Surface | Border | Notes |
|------|---------|--------|-------|
| Sidebar | `--sidebar` (off-white/dark) | `--sidebar-border` (subtle) | Persistent, contains nav + branding |
| Header (within content) | `--background` | `--border` (top only) | Minimal, tagline + breadcrumbs |
| Main Content | `--background` | none | Large breathing room, max-width 1200px |
| Cards/Forms | `--card` with `shadow-card` | `--border` | Questionnaire steps, result sections |
| Footer | `--muted` with opacity | `--border` (top) | Disclaimer, legal links |

**Spacing & Rhythm**
- Grid: 8px base unit. Cards use 24px padding. Forms use 16px field spacing. Sidebar width: 280px (md+), drawer (sm).
- Vertical rhythm: 1.5x line height for body text. Section margins: 32px between card groups.

**Component Patterns**
- Form steps: Card-elevated with clear labels, optional free-text hints in muted color. No inline validation—error state on blur.
- Result sections: Titled cards with 2–3 column grid. Case law citations use serif emphasis (via accent color + font-weight). Score badges use accent background.
- Sidebar nav: Icon + label, active state uses primary background with accent underline. Hover state uses muted bg.

**Signature Detail**
Each assessment parameter is presented as a labeled choice (dropdown) + required free-text box below. Gold accents highlight claim strengths; muted backgrounds flag weaknesses. Legal citations rendered with small-caps or inline accent color, reinforcing authority without visual excess.

**Constraints**
- No animations except fade-in (100ms), scale micro-interactions on buttons (state change).
- No video, no illustrations—text and data-driven UI only.
- Always show sidebar on md+ breakpoints. On sm, use drawer triggered from hamburger.
- Dark mode encouraged (premium apps lean dark); light mode full-featured but secondary.
