# NotebookLM Prompt Designer

Transform any screenshot, image, or topic into a complete, ready-to-paste NotebookLM / Kael.im slide or infographic prompt with a full design system.

## What This Does

This prompt engineering system analyzes your content (images, screenshots, text, or topics) and generates professional NotebookLM slide prompts with:

- **26 curated design styles** covering everything from business reports to creative portfolios
- **Complete design systems** with typography, colors, layouts, and visual rules
- **Slide-by-slide breakdowns** tailored to your content
- **Language detection** and proper placeholder resolution
- **Infographic mode** for single-page designs

## Installation

### For Kiro IDE Users

```bash
npx skill install notebooklm-prompt-designer
```

### For Other AI Assistants (Claude, ChatGPT, etc.)

Copy the contents of `SKILL.md` and paste it into your AI assistant as a system prompt or custom instruction. Then use it with any image or content you want to turn into NotebookLM slides.

## Usage

### In Kiro IDE

The skill automatically triggers when you:

- Upload an image and ask for a NotebookLM prompt
- Say "make slides from this" or "create a presentation prompt"
- Mention NotebookLM, Kael.im, slides, or presentation design
- Ask to turn content into a designed slide deck

### In Other AI Assistants

After loading the SKILL.md as instructions, simply:

1. Upload an image/screenshot OR describe your topic
2. Ask: "Create a NotebookLM prompt for this"
3. Copy the generated prompt and paste it into NotebookLM

### Example Prompts

```
"Create a NotebookLM prompt for this screenshot"
"Make slides from this product feature"
"Generate a presentation prompt for my startup pitch"
"Turn this into an infographic prompt"
"Design a deck about [your topic]"
```

## Available Styles

The skill includes 26 professional design styles:

### Business & Professional
- **A1: Modern Newspaper** - Business reports, economic analysis, data-heavy content
- **A2: Sharp-Edged Minimalism** - Portfolio, consulting, premium brand decks
- **A5: Seminar / Minimal Text** - Academic seminars, conference talks
- **G2: Dark Founder Minimal** - Startup pitches, founder brands, VC presentations
- **G7: SaaS Friendly Bold** - B2B SaaS, HR tools, marketplace products

### Creative & Editorial
- **A3: Yellow × Black Editorial** - Fashion, trend reports, bold brand statements
- **A4: Black × Orange Creative Agency** - Creative agency pitches, product launches
- **G3: Gallery Serif Editorial** - Art galleries, creative studios, cultural institutions
- **G6: Creative Industry Directory Editorial** - Agency rosters, talent directories
- **G8: French Candy Brutalist** - Creative agencies, youth brands, playful products

### Tech & Developer
- **D4: Tech / Art / Neon** - AI, tech research, architecture of ideas
- **D5: Anti-Gravity / Living Artifact** - AI products, agent systems, infrastructure
- **D6: Neo-Retro Dev Deck** - Developer tools, coding products, startup pitches
- **G1: Blueprint Technical Manual** - Software docs, technical education, engineering
- **G4: Apple-Adjacent Product Minimal** - macOS/iOS apps, indie software

### Lifestyle & Consumer
- **B2: Magazine Style** - Consumer content, lifestyle brands, beauty/wellness
- **B3: Pink Street-Style** - Youth brands, streetwear, Gen-Z products
- **B4: Digital / Neo / Pop** - Community platforms, social apps, data visualization
- **C1: Mincho × Handwritten Mix** - Fashion editorial, cultural content

### Specialized
- **B1: Manga Style** - Educational content, storytelling, making complex info fun
- **D1: Deformed Flat Persona** - Character-driven content, friendly explainers
- **D2: Royal Blue × Red Watercolor** - Artistic presentations, creative portfolios
- **D3: Classic / Pop (Sculpture × Vaporwave)** - Bold brand statements, edgy marketing
- **E1: Studio / Mockup / Premium** - Product launches, SaaS showcases
- **F1: Sports / Athletic / Energy** - Sports brands, athletic products, high-energy pitches
- **G5: Natural Wine Brutalist Editorial** - Artisan food/beverage, wine, craft industry

## Features

### Smart Style Matching
The skill analyzes your content and recommends the best style based on:
- Content type and subject matter
- Target audience
- Tone and mood
- Use case

### Complete Design Systems
Each generated prompt includes:
- Full color palette with hex codes
- Typography specifications
- Layout variations for different slide types
- Visual style guidelines
- Design rules and prohibitions

### Placeholder Resolution
All placeholders are automatically resolved:
- Language detection and specification
- Content-specific details filled in
- Concrete slide titles suggested
- No manual editing required

### Customization Support
Request modifications like:
- "Make it darker" (dark mode)
- "More colorful" (expanded palette)
- "More minimal" (increased whitespace)
- "Add data visualization" (charts and graphs)
- "Mix two styles" (hybrid designs)

## Output Format

The skill generates a complete, copy-paste-ready prompt with:

```
═══════════════════════════════════════════
📋 NOTEBOOKLM SLIDE PROMPT
Style: [Style Name] | Language: [Your Language]
═══════════════════════════════════════════

[CONTENT BRIEF]
[What the deck is about and key messages]

[FULL DESIGN SYSTEM]
[Complete design specifications with all placeholders resolved]

[SLIDE STRUCTURE SUGGESTION]
- Slide 1: [Cover with suggested title]
- Slide 2-3: [Context / Problem]
- Slide 4-6: [Main content]
...

[LANGUAGE & TONE INSTRUCTION]
Language: [Your Language]
Tone: [Appropriate tone for content]

═══════════════════════════════════════════
💡 ALTERNATIVE STYLE
[Alternative recommendation with reasoning]
═══════════════════════════════════════════
```

## Requirements

- **For Kiro IDE**: Skills support enabled
- **For other AI assistants**: Any AI that accepts custom instructions and can process images (Claude, ChatGPT, Gemini, etc.)
- No additional dependencies

## Platform Compatibility

This prompt engineering system works with:
- ✅ Kiro IDE (as a skill)
- ✅ Claude (Anthropic)
- ✅ ChatGPT (OpenAI)
- ✅ Gemini (Google)
- ✅ Any AI assistant that supports custom instructions and image analysis

## Contributing

Found a bug or want to suggest a new style? Open an issue or submit a pull request!

## License

MIT License - See LICENSE file for details

## Author

Created with ❤️ for the AI and design community

## Version

1.0.0 - Initial release with 26 design styles

## Why This Exists

NotebookLM is powerful but requires detailed design instructions to create professional slides. This system provides battle-tested design systems and prompt structures that consistently produce high-quality results - whether you're using it in Kiro, Claude, ChatGPT, or any other AI assistant.
