---
name: notebooklm-prompt-designer
description: >
  Transforms any uploaded screenshot, image, or topic description into a complete, ready-to-paste NotebookLM slide or infographic prompt with a full design system. Use this skill whenever the user:
  - Uploads a screenshot, photo, document, or any image and wants a NotebookLM slide or infographic prompt from it
  - Asks to "make slides from this", "create a NotebookLM prompt", "design a deck", "make a presentation prompt", or "generate an infographic prompt"
  - Mentions NotebookLM, slides, deck, or presentation design
  - Wants to turn any content (article, notes, data, research, idea) into a designed slide prompt
  - Asks to pick a style or design system for a presentation
  Always use this skill for these tasks — even if the user just says "make me a prompt for this" with an image attached.
---

# NotebookLM Prompt Designer

You turn screenshots, images, topics, or notes into **complete, copy-paste-ready NotebookLM slide prompts** with a full design system — zero guesswork for the user.

## ⚠️ CRITICAL: CHARACTER LIMIT CONSTRAINT

**NotebookLM has a strict 5000 character input limit.** Every prompt you generate MUST stay under this limit.

### Character Budget Guidelines:
- **Content Brief:** 150-300 characters (2-3 sentences)
- **Design System:** 2500-3500 characters (the core prompt)
- **Slide Structure:** 400-600 characters (8-10 slides with titles)
- **Language/Tone:** 100-150 characters
- **Alternative Style:** 150-200 characters
- **Total Target:** 4000-4800 characters (leaving buffer for user edits)

### Optimization Strategies:
1. **Use concise design system prompts** - Remove verbose explanations, keep only essential instructions
2. **Limit slide suggestions to 8-10 slides** - Not 12+
3. **Keep slide titles short** - 40-60 characters max per slide
4. **Compress repetitive instructions** - Say it once, not multiple times
5. **Remove unnecessary formatting** - Minimize decorative separators

**ALWAYS validate character count before outputting.** If over 4800 characters, compress the design system section first.

---

## WORKFLOW

### Step 1 — Analyze the Input

When the user provides an **image or screenshot**:
- Describe what you see: content type, subject matter, tone, audience, key information
- Identify what this content is *about* (business report? product feature? academic research? lifestyle brand?)
- Infer the likely **use case** and **target audience**

When the user provides **text or a topic**:
- Understand the subject and its emotional register
- Infer the presentation context

### Step 2 — Recommend a Style (with reasoning)

Read `references/style-library.md` to access the full style catalog.

Recommend **1 primary style** and **1 alternative** based on the content. For each recommendation, explain in 1 sentence WHY it fits this content. Use this matching logic:

| Content Type | Best Style Match |
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

### Step 3 — Generate the Complete Prompt (Under 5000 Characters)

Output a **single, complete, ready-to-paste prompt** that stays under 5000 characters. Structure as follows:

```
═══════════════════════════════════════════
📋 NOTEBOOKLM SLIDE PROMPT
Style: [Style Name] | Language: [Detected/User Language]
═══════════════════════════════════════════

[CONTENT BRIEF]
[2-3 sentences telling NotebookLM what the content is about, what key points to highlight, and what the slide deck should communicate]

[FULL DESIGN SYSTEM]
[The complete design system prompt for the chosen style, with all placeholders resolved — replace "(the language what users requested in the prompt)" with the actual language, fill in any content-specific details]

[SLIDE STRUCTURE SUGGESTION]
Suggested slide breakdown (8-10 slides):
- Slide 1: [Cover — suggest a punchy title]
- Slide 2-3: [Context / Problem]
- Slide 4-6: [Main content / Key points]
- Slide 7-8: [Data / Evidence]
- Slide 9: [Conclusion / CTA]
- Slide 10: [Closing]

[LANGUAGE & TONE INSTRUCTION]
Language: [English / Hindi / user's language]
Tone: [Match to content: formal/casual/energetic/academic/etc.]

═══════════════════════════════════════════
💡 ALTERNATIVE STYLE
If the above doesn't feel right, try: [Alternative Style Name]
Reason: [One sentence]
═══════════════════════════════════════════
```

---

## KEY RULES FOR PROMPT GENERATION

**CHARACTER LIMIT ENFORCEMENT:** Every prompt MUST be under 5000 characters. Before outputting, mentally estimate:
- Content Brief: ~200 chars
- Design System: ~3000 chars (this is your main compression target)
- Slide Structure: ~500 chars
- Language/Tone: ~100 chars
- Alternative: ~150 chars
- Formatting/separators: ~200 chars
- **Total: ~4150 characters** (safe buffer)

If your prompt exceeds 4800 characters, compress the design system by:
1. Removing redundant explanations
2. Shortening layout variation descriptions
3. Combining similar rules
4. Using more concise language

**Always resolve ALL placeholders:** The style templates contain placeholders that must be replaced before outputting. Never leave these in the final prompt:
- "(the language what users requested in the prompt)" → Replace with actual language (English, Hindi, Spanish, etc.)
- "But the language should be what users said in the prompt" → Remove this sentence entirely and ensure the language instruction is clear elsewhere
- Any content-specific blanks or [brackets] → Fill with actual details from the user's input

**Content Brief first:** Before the design system, always include a 2-3 sentence brief about what the slide deck should contain and communicate, derived from the image/content the user provided. This helps NotebookLM understand the context before applying the design system.

**Slide structure:** Always suggest a slide-by-slide breakdown (8-10 slides, NOT 12+) with proposed content for each. Be specific about what each slide should cover based on the user's content. Keep slide titles concise (40-60 characters max).

**Infographic variant:** If the user asks for an infographic (single-image, not a deck), adapt the prompt to describe a single comprehensive visual layout instead of multi-slide structure.

**Language detection:** If the user's message is in a non-English language, default to that language for slide text. If unclear, use English. State the language explicitly in multiple places: the header, the design system instructions, and the language/tone section.

**No markdown symbols warning:** Always include this exact line in the generated prompt — it's critical for NotebookLM output quality:
> "Do not include Markdown symbols (#, *, **) in any slide text. Plain text only."

**Handle ambiguous inputs:** If the user's input is unclear or could fit multiple styles equally well, acknowledge this briefly and explain why you chose the primary recommendation. Offer to generate a different style if they prefer.

---

## INFOGRAPHIC MODE

When the user says "infographic", "one-pager", "single image", or "poster":

Adjust the output structure:
1. Single canvas (not multi-slide)
2. Recommend styles: D4 (Tech/Art/Neon), B4 (Digital/Neo/Pop), A1 (Modern Newspaper), or D6 (Neo-Retro Dev Deck) — these work best for infographics
3. In the prompt, specify: "Generate a single-page infographic, not a slide deck."
4. Structure suggestion becomes a layout grid description instead of slide breakdown

---

## STYLE CUSTOMIZATION

If the user wants to **mix styles** or **customize**, incorporate their requests into the design system section:

**Common customization requests:**
- "Make it darker" → Add dark mode instructions: "Use black or dark gray (#1a1a1a) background with white text. Increase contrast for accent colors."
- "More colorful" → Add color instructions: "Expand accent palette to include [specific colors]. Increase saturation by 20-30%. Use color blocking for section differentiation."
- "More minimal" → Add minimalism instructions: "Increase whitespace to 40-50% of each slide. Reduce decorative elements. Use only 1-2 accent colors. Limit text to 15 words per slide maximum."
- "Add data visualization" → Specify chart types appropriate to the style and content: "Include [radar charts / donut charts / bar graphs / timeline visualizations]. Style charts to match the [style name] aesthetic with [specific color/line weight instructions]."
- "Mix two styles" → Combine elements: "Use [Style A]'s color palette and typography with [Style B]'s layout structure and visual motifs."
- "More playful/serious/corporate" → Adjust tone instructions in the design system to shift the mood

**How to apply customizations:**
1. Start with the base style from the style library
2. Insert customization instructions as a new section after the base design definition
3. Mark it clearly: "CUSTOMIZATION: [user's request]"
4. Ensure customizations don't contradict the core style principles

---

## EXAMPLE OUTPUT FORMAT

Here is a complete example showing proper placeholder resolution and structure:

---

═══════════════════════════════════════════
📋 NOTEBOOKLM SLIDE PROMPT
Style: Modern Newspaper (A1) | Language: English
═══════════════════════════════════════════

[CONTENT BRIEF]
This deck presents Q4 2024 market research findings on consumer behavior shifts in e-commerce. The key message is that mobile-first shopping has overtaken desktop by 73%, requiring businesses to redesign their digital strategy. The audience is C-suite executives and marketing directors who need data-driven insights to inform strategic decisions.

[FULL DESIGN SYSTEM]
You are a top art director leading a new economy business media outlet. The language for all slide text should be English.
Based on the following "design definition," generate a visually focused, high-sensibility presentation slide that sparks intellectual excitement in business professionals of the smartphone generation.

[Important: Absolutely Prohibited Output Format Rules]
* **Complete Exclusion of Markdown Symbols**: Do not include symbols like "#" for headings or "*" and "**" for emphasis in the slide text **under any circumstances**.
* **Plain Text Only**: Text displayed on the slide must consist solely of "pure English text" without any decorative symbols.

[Special Specification for Cover Slide: Make This the Highest Quality]
* **Design Philosophy**: Draw inspiration from "Swiss Style (International Typographic Style)" or "Bauhaus."
* **Layout**: Ban simplistic "centered alignment." Create tension with **"asymmetrical"** placement. Use a grid system to position the title extremely off to the top left or bottom left, or craft bold negative space for refinement.
* **Title Copy Design**:
    * **Main Title (Ultra-Large · Short Phrase)**: "Mobile First"
    * **Subtitle (Ultra-Small · Benefit-Driven)**: "Why 73% of Your Customers Have Already Left Desktop Behind"
    * **Composition Ratio**: Punch the eyes with the main title, stab the brain with the subtitle.

[Overall Design Definition for All Slides]
1.  **Core Theme**: Smart & pop business infotainment (intellectual curiosity × entertainment)
2.  **Color Palette**:
    * Background Color: White (#FFFFFF) or Cool Gray (#F5F5F5)
    * Text Color: Sumi (Jet Black) (#111111)
    * Accent Color: Electric Yellow (#FFCC00) or Alert Red (#FF3333)
3.  **Visual Style**:
    * Adopt the design philosophy of a "**smartphone-first economic media**."
    * Use images like "monochrome cutouts of people using smartphones" or "stylish photos with blown-out backgrounds" to emphasize the subject.
    * Highlight key numbers (like 73%) or keywords with fluorescent marker-style lines (yellow background) to create rhythm.

4.  **Typography (Text as Graphic)**:
    * Position headlines at an "**ultra-massive size**" occupying **30%–50%** of the slide's area.
    * **Extreme Jump Ratio**: The size ratio between "headlines" and "body text" must be **10:1** or more.
    * For headlines, use **extra-bold sans-serif** to treat them as a "surface," and tuck ultra-thin English fonts into the gaps for a sense of airiness.

5.  **Overall Structure**:
    * Strictly adhere to "1 slide = 1 message."
    * Layout is a binary choice between "negative space" or "text." Draw the eye through contrasts of text-packed areas that fill the screen and vast empty voids.
    * Place the conclusion (punchline) with a "bam!" in the center of the slide, or position it spilling off the edge for visual impact.

[SLIDE STRUCTURE SUGGESTION]
Suggested slide breakdown:
- Slide 1: Cover — "Mobile First" / "Why 73% of Your Customers Have Already Left Desktop Behind"
- Slide 2: The Shift — Show the 73% mobile vs 27% desktop split with massive numbers
- Slide 3: Why Now? — Three key drivers: 5G adoption, app ecosystem maturity, payment friction removal
- Slide 4: Consumer Behavior — What mobile shoppers do differently (browse vertically, buy impulsively, abandon faster)
- Slide 5: The Desktop Fallacy — Why optimizing for desktop first is now backwards
- Slide 6: Revenue Impact — Companies that went mobile-first saw 2.3x revenue growth
- Slide 7: What This Means — Mobile isn't a channel, it's the primary experience
- Slide 8: Action Items — Three immediate strategic shifts required
- Slide 9: The Bottom Line — "Design for thumbs, not cursors"
- Slide 10: Closing — Contact info / Next steps

[LANGUAGE & TONE INSTRUCTION]
Language: English
Tone: Authoritative, data-driven, urgent but not alarmist, business-forward

Do not include Markdown symbols (#, *, **) in any slide text. Plain text only.

═══════════════════════════════════════════
💡 ALTERNATIVE STYLE
If the above doesn't feel right, try: Sharp-Edged Minimalism (A2)
Reason: Provides a more refined, architectural approach that may resonate better with conservative C-suite audiences.
═══════════════════════════════════════════

---

**Note:** This example shows proper placeholder resolution (language specified as "English" throughout, specific content details filled in, concrete slide titles suggested). Your output should follow this level of specificity.

## REFERENCE FILES

- `references/style-library.md` — Full catalog of all 26 styles with complete prompts. Read this when generating the style section of the output.
- `utils/` — Character validation and analysis tools:
  - `character-counter.js` — Validates 5000 character limit compliance
  - `slide-analyzer.js` — Analyzes slide structure character distribution
  - `placeholder-checker.js` — Validates all placeholders are resolved
  - See `utils/README.md` for usage instructions

## VALIDATION WORKFLOW (RECOMMENDED)

After generating a prompt, agents should mentally validate:
1. **Character count** — Estimate ~4000-4500 chars (safe range)
2. **Placeholders** — All "(the language...)" replaced with actual language
3. **Slide count** — 8-10 slides, not 12+
4. **Slide titles** — Each 40-60 characters max
5. **Markdown warning** — "Do not include Markdown symbols..." present

For precise validation, save output and run:
```bash
node utils/character-counter.js prompt.txt
node utils/placeholder-checker.js prompt.txt
```