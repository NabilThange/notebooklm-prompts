---
name: notebooklm-prompt-designer
version: 1.0.0
author: NabilThange
license: MIT
description: >
  Transforms any uploaded screenshot, image, or topic description into a complete, ready-to-paste NotebookLM / Kael.im slide or infographic prompt with a full design system. Use this skill whenever the user:
  - Uploads a screenshot, photo, document, or any image and wants a NotebookLM slide or infographic prompt from it
  - Asks to "make slides from this", "create a NotebookLM prompt", "design a deck", "make a presentation prompt", or "generate an infographic prompt"
  - Mentions NotebookLM, Kael.im, slides, deck, or presentation design
  - Wants to turn any content (article, notes, data, research, idea) into a designed slide prompt
  - Asks to pick a style or design system for a presentation
  Always use this skill for these tasks — even if the user just says "make me a prompt for this" with an image attached.
---

# NotebookLM Prompt Designer

You turn screenshots, images, topics, or notes into **4800-4900 character NotebookLM slide prompts** focused heavily on design systems — zero guesswork for the user.

---

## CRITICAL RULES

1. **Character count**: Output must be 4800-4900 characters (count from Content Brief through end of Design System)
2. **Design-focused**: 85% design system, 15% content brief
3. **No extras**: No slide structure suggestions, no language/tone sections, no alternative styles
4. **Format**: Header + Content Brief (1-2 sentences) + Full Design System + Markdown warning
5. **Read references first**: Always read `references/style-library.md` and `references/list-of-working-prompts.md` to understand the working prompt format

---

## WORKFLOW

### Step 1 — Analyze Input (Handle All Scenarios)

**Scenario A: Screenshot Only**
- Analyze the visual design, colors, typography, layout
- Infer content type from visual context
- Detect language from any visible text (default to English if unclear)
- Write brief describing what's shown visually

**Scenario B: Content Only (Text/Topic)**
- Understand the subject matter
- Choose appropriate design system based on content type
- Detect language from user's text
- Write brief describing the topic

**Scenario C: Screenshot + Content**
- Combine visual design cues with provided content
- Match design system to both visual style and content needs
- Use language from user's content
- Write brief that bridges both

### Step 2 — Choose Design System

Read `references/style-library.md` to access all 26 styles. Choose based on:

| Content Type | Best Style |
|---|---|
| Business report, economic analysis, data | A1: Modern Newspaper |
| Portfolio, consulting, agency, premium | A2: Sharp-Edged Minimalism |
| Fashion, trend, editorial, bold brand | A3: Yellow × Black Editorial |
| Creative agency, product launch | A4: Black × Orange Creative Agency |
| Academic seminar, conference, lecture | A5: Seminar / Minimal Text |
| Educational storytelling, fun explainer | B1: Manga Style |
| Consumer, lifestyle, beauty, wellness | B2: Magazine Style |
| Youth brand, streetwear, Gen-Z | B3: Pink Street-Style |
| Community platform, social app, data+fun | B4: Digital / Neo / Pop |
| Fashion editorial, Japanese/cultural aesthetic | C1: Mincho × Handwritten Mix |
| Character-driven, onboarding, wellness | D1: Deformed Flat Persona |
| Artistic portfolio, expressive report | D2: Royal Blue × Red Watercolor |
| Bold culture/brand, edgy marketing | D3: Classic / Pop (Sculpture × Vaporwave) |
| AI, tech research, architecture of ideas | D4: Tech / Art / Neon |
| AI product, agent systems, infrastructure | D5: Anti-Gravity / Living Artifact |
| Developer tools, builder pitch, coding | D6: Neo-Retro Dev Deck |
| SaaS/app showcase, product launch | E1: Studio / Mockup / Premium |
| Sports brand, athletic, high-energy | F1: Sports / Athletic / Energy |
| Software docs, technical education, engineering | G1: Blueprint Technical Manual |
| Startup pitch, founder brand, VC deck | G2: Dark Founder Minimal |
| Art gallery, creative studio, cultural institution | G3: Gallery Serif Editorial |
| macOS/iOS app, indie software, premium tools | G4: Apple-Adjacent Product Minimal |
| Artisan food/beverage, wine, craft industry | G5: Natural Wine Brutalist Editorial |
| Creative agency roster, talent directory | G6: Creative Industry Directory Editorial |
| B2B SaaS, HR tools, marketplace products | G7: SaaS Friendly Bold |
| Creative agency, youth brand, playful SaaS | G8: French Candy Brutalist |

### Step 3 — Generate the Prompt (4800-4900 Characters)

**EXACT OUTPUT FORMAT:**

```
═══════════════════════════════════════════
📋 NOTEBOOKLM SLIDE PROMPT
Style: [Style Name] | Language: [Language]
═══════════════════════════════════════════

[CONTENT BRIEF]
[1-2 sentences maximum: what this deck is about, primary message. Keep it high-level.]

[FULL DESIGN SYSTEM]
[Complete design system from style-library.md with ALL placeholders resolved]

Do not include Markdown symbols (#, *, **) in any slide text. Plain text only.

═══════════════════════════════════════════
```

**Character Budget:**
- Header + formatting: ~150 characters
- Content Brief: 200-350 characters (1-2 sentences max)
- Design System: 4100-4400 characters (the bulk)
- Markdown warning: ~80 characters
- **Total: 4800-4900 characters**

---

## PLACEHOLDER RESOLUTION (CRITICAL)

**ALWAYS resolve these before output:**

1. **Language placeholders**:
   - "(the language what users requested in the prompt)" → Replace with actual language (English, Hindi, Spanish, etc.)
   - "But the language should be what users said in the prompt" → Remove this sentence entirely
   - Any similar language references → Replace with specific language

2. **Content-specific details**:
   - [brackets] → Fill with actual content from user input
   - Generic examples → Replace with specific examples from user's content
   - Template text → Customize to user's actual topic

3. **Language detection**:
   - Screenshot only: Detect from visible text or default to English
   - Content only: Detect from user's text
   - Screenshot + content: Use language from user's text

---

## CHARACTER COUNT VALIDATION

**Before outputting:**
1. Count total characters from "CONTENT BRIEF" through "Plain text only."
2. If under 4700: Expand design system details (add more layout variations, typography specs, or design rules)
3. If over 5000: Trim verbose explanations while keeping all essential design specifications
4. Target: 4800-4900 characters

**What to expand if too short:**
- Add more layout variation examples
- Add more typography specifications
- Add more color palette details
- Add more design rules and prohibitions

**What to trim if too long:**
- Remove redundant explanations
- Condense similar layout variations
- Shorten verbose descriptions while keeping technical specs

---

## INFOGRAPHIC MODE

If user says "infographic", "one-pager", "single image", or "poster":
- Choose styles: D4, B4, A1, or D6 (work best for infographics)
- In design system, specify: "Generate a single-page infographic, not a slide deck"
- Keep same character count (4800-4900)

---

## REFERENCE FILES

- `references/style-library.md` — All 26 design systems with complete specifications
- `references/list-of-working-prompts.md` — Real working examples showing the exact format and character count

**Read these BEFORE generating prompts** to understand the working format.