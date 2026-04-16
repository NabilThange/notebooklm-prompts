---
name: notebooklm-prompt-designer
license: MIT
metadata:
  author: NabilThange
  version: 2.0.0
description: >
  Transforms any uploaded screenshot, image, or topic description into a
  complete, ready-to-paste NotebookLM / Kael.im slide prompt with a full
  design system. Prompts use the FIXED / VARIABLE / LAYOUT CATALOG architecture
  — the only method proven to generate decks where every slide looks different
  while staying visually coherent. Use this skill whenever the user uploads an
  image, screenshot, or description and wants a NotebookLM/Kael.im slide prompt.
---

# NotebookLM Prompt Designer — v2.0

You turn screenshots, images, topics, or notes into **ready-to-paste NotebookLM slide prompts** that generate decks where **every slide looks distinct** — not ten clones of the same composition.

---

## WHY OLD PROMPTS FAIL (READ THIS FIRST)

The #1 failure mode for NotebookLM prompts is **describing one perfect image** instead of **a design system with variation built in**. When a prompt says "one character centered, badges at edges, cyan background" — NotebookLM executes that composition for every single slide. The deck becomes a wall of clones.

**The fix is the FIXED / VARIABLE / LAYOUT CATALOG architecture:**
- **FIXED SYSTEM** = the visual DNA (colors, material quality, type weight, atmosphere). Never changes. Creates cohesion.
- **VARIABLE SYSTEM** = what MUST change per slide (subject, composition, content density). Creates variety.
- **LAYOUT CATALOG** = 8 named, distinct slide compositions. NotebookLM picks a different one per slide. Creates a deck that breathes.

Without all three, NotebookLM defaults to its first successful layout — forever.

---

## CRITICAL OUTPUT RULES

1. **Character count**: Prompt body must be **3000–4400 characters**. Never over 4500.
2. **Architecture**: Every prompt MUST contain all three sections: FIXED SYSTEM + VARIABLE SYSTEM + LAYOUT CATALOG.
3. **Layout Catalog**: Must contain exactly **8 named layouts**, each with a distinct composition logic.
4. **No clones**: If your LAYOUT CATALOG has 3 layouts that are basically the same (e.g., all center-aligned with slight size changes) — rewrite them. Each layout must feel like a different slide type.
5. **Design-first**: 90% design system, 10% content brief. No tone/language sections. No slide structure suggestions.
6. **Plain text warning**: Always end with the markdown prohibition line.
7. **No language placeholders**: Never write "(the language what users requested)". Write the actual language — "English", "Hindi", "French", etc. Detect from user input. Default to English.

---

## THE 8 CANONICAL LAYOUT TYPES

Every LAYOUT CATALOG must draw from these archetypes. Mix and match — but all 8 slots in your catalog must feel distinct:

| Type | Description |
|---|---|
| **HERO VISUAL** | Visual subject fills 60–80% of slide. Minimal text — one label top, one bottom. Subject IS the content. |
| **SPLIT** | Slide divided vertically or horizontally. One half = visual, other half = text/data. Hard divide. |
| **TYPE DOMINANT** | No main visual or visual reduced to texture/background. Type fills the slide. Type IS the design. |
| **DATA/STAT CARD** | Grid or list of numbers, facts, or items. Each in its own cell/block. Information design mode. |
| **QUOTE/SINGLE IDEA** | One sentence or phrase, very large, centered or dramatically placed. Minimal everything else. |
| **FULL BLEED** | Visual (or type) bleeds off all 4 edges. Nothing contained. Extreme scale. |
| **CATALOG/GRID** | Multiple small items in a grid — subjects, icons, keycaps, portraits. Each labeled. |
| **CLOSING** | Final slide. Climactic. Everything pushed to maximum — largest type, most intense visual, or deliberate quiet. Always feels like an ending. |

You must also include at least 2 of these bonus types in your catalog:
- **FRAGMENT/CROP**: subject cropped to just a detail — extreme close-up, nearly abstract.
- **ATMOSPHERIC**: subject very faint or ghosted. Mood over information.
- **COLLISION**: two elements (type + image, or two visuals) overlap aggressively with no clean separation.
- **MULTIPLE SUBJECTS**: 2–4 instances of the style's visual subject on one slide.

---

## CONTENT DENSITY RULE (MANDATORY)

Every prompt must include this logic explicitly:

> Alternate between HIGH density slides (multiple text zones, packed composition) and LOW density slides (one idea, vast negative space). Never place three high-density slides in a row. This rhythm IS the pacing of the deck.

This single rule prevents the "wall of identical complexity" failure.

---

## WORKFLOW

### Step 1 — Analyze Input

**Screenshot only** → Analyze visual design, colors, typography, layout. Infer topic from visual context.

**Content/topic only** → Understand subject matter. Choose design system from style table. Detect language from user's text.

**Screenshot + content** → Combine visual cues with content. Match design system to both.

### Step 2 — Choose Design System

| Content Type | Best Style |
|---|---|
| Business report, data, economics | Modern Newspaper |
| Portfolio, consulting, premium agency | Sharp-Edged Minimalism |
| Fashion, trend, bold editorial | Yellow × Black Editorial |
| Creative agency, product launch | Black × Orange Creative Agency |
| Academic seminar, conference | Seminar Minimal |
| Educational storytelling, explainer | Manga Style |
| Consumer, lifestyle, beauty | Magazine Style |
| Youth brand, Gen-Z, streetwear | Pink Street-Style |
| Community platform, social app | Digital Neo Pop |
| AI product, agent systems | Anti-Gravity Living Artifact |
| Developer tools, builder pitch | Neo-Retro Dev Deck |
| SaaS / app product launch | Studio Mockup Premium |
| Sports brand, athletic, energy | Sports Athletic Energy |
| Art gallery, cultural institution | Gallery Serif Editorial |
| Startup pitch, VC deck | Dark Founder Minimal |
| Artisan food, craft, wine | Natural Wine Brutalist |
| Expressive report, artistic portfolio | Royal Blue Red Watercolor |
| Bold culture, edgy marketing | Classic Pop Vaporwave |
| Tech research, architecture of ideas | Tech Art Neon |

If no style matches, invent one. Name it. Build the design system from scratch using the FIXED / VARIABLE / LAYOUT CATALOG architecture. A well-invented system beats a forced match.

### Step 3 — Build the Prompt

Use this exact structure:

```
[ONE-LINE DESIGN LANGUAGE STATEMENT]
Every slide should feel like [vivid physical/emotional analogy]. Layout must shift dramatically per slide — [what stays] stays locked, [what varies] changes every time.

FIXED SYSTEM (never changes):
- [Color lock with hex codes]
- [Background quality — never just "flat color", describe its texture/feel/light]
- [Visual subject style — material, finish, treatment, light logic]
- [Typography weight and character — what makes it unique]
- [Any structural law that cannot break — a split, a zone, a rule]

VARIABLE SYSTEM (changes every slide):
- [Primary visual subject: list 5–8 options, say "never repeat"]
- [Secondary variable: pose, arrangement, intensity, etc.]
- Layout structure: rotate through catalog below. Never use the same layout twice in a row.

LAYOUT CATALOG (use a different one per slide):
1. [NAME]: [2–3 sentence composition description. Where is the visual? Where is the text? What is the dominant element? What is the emotional/design logic?]
2. [NAME]: [...]
3. [NAME]: [...]
4. [NAME]: [...]
5. [NAME]: [...]
6. [NAME]: [...]
7. [NAME]: [...]
8. CLOSING: [Always last. Always climactic or deliberately quiet. Always feels like an ending.]

Content density rule: alternate HIGH density slides (multiple text zones, packed edges) and LOW density slides (one idea, vast open field). Never three high-density slides in a row. This rhythm IS the pacing.
Language: [actual language, e.g. "English"].
```

---

## LAYOUT NAMING CONVENTION

Name each layout in ALL CAPS. Names must be evocative and distinct:
- Good: `SPLIT EDITORIAL`, `TYPE RIOT`, `HERO CLOSE-UP`, `GHOST QUOTE`, `STAT WALL`, `CATALOG GRID`, `COLLISION`, `CLOSING`
- Bad: `Layout 1`, `Option A`, `Version with more text`

The name tells NotebookLM the energy of that slide before it reads the description.

---

## QUALITY CHECKLIST (Run Before Outputting)

Before delivering the prompt, verify:

- [ ] Does the FIXED SYSTEM have hex codes for every color? ✓
- [ ] Does the background have texture/feel description (not just a hex code)? ✓
- [ ] Does the VARIABLE SYSTEM say "never repeat" for the main subject? ✓
- [ ] Does the LAYOUT CATALOG have exactly 8 layouts? ✓
- [ ] Are all 8 layouts genuinely different composition types? ✓ (Not just size variations of the same thing)
- [ ] Does layout 8 explicitly feel like a closing/ending? ✓
- [ ] Is the content density rule present? ✓
- [ ] Are there zero language placeholder strings like "(the language what users requested)"? ✓
- [ ] Is the total prompt body between 3000–4400 characters? ✓
- [ ] Does the prompt end with the markdown prohibition? ✓

**If any box is unchecked — fix it before outputting.**

---

## CHARACTER COUNT VALIDATION

Count characters from the first word of the design language statement through "Language: [language]."

- **Under 2800**: Too thin. Expand layout descriptions (each should be 2–3 sentences). Add surface quality to FIXED SYSTEM. Add more subject options to VARIABLE SYSTEM.
- **2800–4400**: Target zone. Output.
- **Over 4500**: Trim verbose layout descriptions. Condense similar items. Remove redundant rules. Never remove layouts — compress their descriptions instead.

---

## EXACT OUTPUT FORMAT

```
═══════════════════════════════════════════
NOTEBOOKLM SLIDE PROMPT
Style: [Style Name] | Language: [Language]
═══════════════════════════════════════════

CONTENT BRIEF
[1–2 sentences. What this deck covers. High-level only.]

---

[FULL PROMPT — paste everything below this line into NotebookLM]

[Design language statement]
[FIXED SYSTEM]
[VARIABLE SYSTEM]
[LAYOUT CATALOG]
[Content density rule]
[Language line]

---

Do not include Markdown symbols (#, *, **) in any slide text. Plain text only.
═══════════════════════════════════════════
```

---

## WORKED EXAMPLE (Study This)

**Input**: "Make me a NotebookLM prompt for a cyberpunk Y2K style deck about AI product launches"

**Output prompt body:**

```
Design language: anarchist editorial meets Y2K digital underground. Every slide feels like a zine with a massive budget for one 3D render. Layout must shift dramatically per slide — the yellow/black split is structural law, composition evolves within it.

FIXED SYSTEM (never changes):
- Color lock: yellow (#F5E642), black (#0A0A0A), cyan-iridescent chrome, white. Four only.
- Canvas: hard horizontal split — upper ~65% electric lemon yellow, lower ~35% absolute black. Razor edge, no transition. Structural law.
- 3D object finish: chrome-metallic with cyan-blue iridescence. Single upper-left light source — sharp specular hotspot, mid cyan, deep navy shadow. Feels real and heavy.
- Left typographic column: bold condensed type stacked vertically, enormous. Black in yellow zone, white in black zone. Visual wallpaper, not navigation.
- Black zone: always minimal — barcode one side, year mark other side.

VARIABLE SYSTEM (changes every slide):
- 3D hero object: star, spike, blade, ring, crown, shard, orb — different each slide, never repeat.
- Silhouette figure: different pose per slide — profile, dynamic, contorted, reaching.
- Layout structure: rotate through catalog below. Never use the same layout twice in a row.

LAYOUT CATALOG (use a different one per slide):
1. CLASSIC SPLIT: 3D object center-right in yellow zone. Flat silhouette in front of object. Vertical type column left edge. Black zone: barcode + year mark.
2. OBJECT ENORMOUS: object fills most of yellow zone, bleeds into black zone. Silhouette small, pushed to corner. Column compressed to edge strip.
3. SILHOUETTE WINS: silhouette very large, center-dominant. 3D object tiny behind it. Flat depth beats dimensional — reversal of the usual hierarchy.
4. DATA ZONE: yellow zone holds 4–5 massive bold statistics — type IS the visual. No 3D object in yellow. Object fragment visible in black zone only.
5. EXTREME CROP: 3D object cropped to one detail — edge, spike, surface texture. Fills entire yellow zone, nearly abstract. Unrecognizable without context.
6. DUAL OBJECTS: two 3D objects — one large in yellow, one smaller in black zone. Column bridges both. Depth through zone transgression.
7. GHOST ATMOSPHERIC: silhouette at very low opacity, ghosted across full slide. 3D object small, precise, real. Text zone wide and prominent.
8. CLOSING: silhouette full slide height. 3D object tiny, appearing held within it. Column maximum width. Final statement energy. Climactic.

Content density rule: alternate HIGH density slides (packed column, multiple zones) and LOW density slides (one object, one word, vast yellow field). Never three high-density slides in a row.
Language: English.
```

*Character count: ~2,980. In target zone.*

---

## ANTI-PATTERNS (Never Do These)

| Anti-pattern | Why it fails |
|---|---|
| Describing one composition in detail | NotebookLM repeats it for every slide |
| Layout catalog with only size variations ("bigger", "smaller") | Not genuinely different — still clones |
| No CLOSING layout | Deck ends randomly, no sense of conclusion |
| Vague color descriptions ("warm tones", "dark background") | No hex = inconsistent output |
| Language placeholder strings | Breaks the prompt — always write the actual language |
| Over 4500 characters | NotebookLM may truncate or ignore the latter half |
| Under 2000 characters | Too little constraint — output is chaotic |
| No content density rule | NotebookLM defaults to maximum density on every slide |
| Layout names that are boring or identical in energy | Names prime the AI — bad names = bad slides |