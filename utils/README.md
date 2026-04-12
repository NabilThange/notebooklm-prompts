# NotebookLM Prompt Utilities

Validation and analysis tools for NotebookLM prompt generation.

## 🎯 Overview

These utilities help agents and users validate that generated NotebookLM prompts meet all requirements:
- Stay under 5000 character limit
- Have all placeholders resolved
- Follow optimal slide structure
- Include required warnings

## 🛠️ Tools

### Quick Validation (Recommended)

**validate-all.sh / validate-all.ps1**

Runs all three validation checks in sequence.

**Usage:**
```bash
# Linux/Mac
./validate-all.sh prompt.txt

# Windows PowerShell
.\validate-all.ps1 prompt.txt
```

**Output:** Combined report from all three validators with final pass/fail status.

---

### 1. Character Counter (`character-counter.js`)

Analyzes total character count and provides section-by-section breakdown.

**Usage:**
```bash
# From file
node character-counter.js prompt.txt

# From pipe
cat prompt.txt | node character-counter.js

# From agent output
echo "$PROMPT" | node character-counter.js
```

**Output:**
- Total character count vs 5000 limit
- Visual progress bar
- Section breakdown (Content Brief, Design System, Slide Structure, etc.)
- Specific recommendations for compression
- Status: ✅ SAFE / ⚡ NEAR LIMIT / ⚠️ TOO CLOSE / ❌ EXCEEDS LIMIT

**Example:**
```
╔════════════════════════════════════════════════════════════╗
║         NotebookLM Prompt Character Analysis              ║
╚════════════════════════════════════════════════════════════╝

✅ Status: SAFE
Total Characters: 4234 / 5000
Progress: ████████████████████████████████████░░░░

📊 Section Breakdown:

  Content Brief                  287 chars (6.8%)  [Target: 150-300]
  Design System                 2891 chars (68.3%) [Target: 2500-3500]
  Slide Structure                543 chars (12.8%) [Target: 400-600]
  Language/Tone                  134 chars (3.2%)  [Target: 100-150]
  Alternative Style              189 chars (4.5%)  [Target: 150-200]
  Formatting/Separators          190 chars (4.5%)  [Target: ~200]

💡 Recommendations:

  ✅ GOOD: 566 chars of safe buffer remaining
```

### 2. Slide Analyzer (`slide-analyzer.js`)

Analyzes slide structure to identify verbose slide titles.

**Usage:**
```bash
# From file
node slide-analyzer.js prompt.txt

# From pipe
cat prompt.txt | node slide-analyzer.js
```

**Output:**
- Total slides count
- Character count per slide
- Visual bars showing relative length
- Warnings for slides over 60-80 characters
- Recommendations for optimization

**Example:**
```
╔════════════════════════════════════════════════════════════╗
║         NotebookLM Slide Structure Analysis               ║
╚════════════════════════════════════════════════════════════╝

📊 Overview:
   Total Slides: 10
   Total Characters: 543
   Average per Slide: 54 chars
   Range: 38 - 87 chars

📝 Slide-by-Slide Breakdown:

  ✅ Slide  1:  45 chars ███████████████████░░░░░░░░░░░
     Cover — "Mobile First" / "Why 73% of Your Customers Have Already...

  ✅ Slide  2:  52 chars ██████████████████████░░░░░░░░░
     The Shift — Show the 73% mobile vs 27% desktop split with massiv...

  ❌ Slide  3:  87 chars ████████████████████████████████
     Why Now? — Three key drivers: 5G adoption, app ecosystem maturity...

💡 Recommendations:

  ❌ 1 slide(s) exceed 80 characters:
     • Slide 3: 87 chars - "Why Now? — Three key drivers: 5G adoption, app eco..."
  → Shorten these to 40-60 characters each
```

### 3. Placeholder Checker (`placeholder-checker.js`)

Validates that all placeholders have been resolved.

**Usage:**
```bash
# From file
node placeholder-checker.js prompt.txt

# From pipe
cat prompt.txt | node placeholder-checker.js
```

**Output:**
- Unresolved placeholder detection
- Language consistency check
- Markdown warning presence check
- Line numbers and context for each issue

**Example:**
```
╔════════════════════════════════════════════════════════════╗
║         NotebookLM Placeholder Validation                 ║
╚════════════════════════════════════════════════════════════╝

❌ Found 3 issue(s)

🔍 Unresolved Placeholders (2):

  1. Language placeholder (Line 23)
     Found: "(the language what users requested in the prompt)"
     Context: You are a top art director. But the language should be (the lang...
     Fix: Replace with actual language (e.g., "English", "Hindi", "Spanish")

  2. Bracketed placeholder (Line 67)
     Found: "[Your Brand Name]"
     Context: This deck presents [Your Brand Name]'s Q4 results...
     Fix: Replace with actual content

🌍 Language Issues (1):

  1. Language inconsistency
     Multiple languages detected: english, hindi. Should be consistent throughout.
```

## 🤖 Agent Integration

### For Kiro Skills

Add this to your skill workflow after generating a prompt:

```javascript
// In SKILL.md workflow
After generating the prompt:
1. Save prompt to temporary file
2. Run: node utils/character-counter.js temp-prompt.txt
3. Run: node utils/placeholder-checker.js temp-prompt.txt
4. If issues found, regenerate with fixes
5. Output final validated prompt
```

### Command Line Validation

```bash
# Full validation pipeline
cat prompt.txt | \
  node utils/placeholder-checker.js && \
  node utils/character-counter.js prompt.txt && \
  node utils/slide-analyzer.js prompt.txt
```

## 📋 Validation Checklist

Before outputting a prompt, ensure:

- [ ] Total characters < 4800 (safe buffer)
- [ ] All language placeholders resolved
- [ ] Language consistent throughout
- [ ] 8-10 slides (not 12+)
- [ ] Slide titles 40-60 characters
- [ ] Markdown warning included
- [ ] No bracketed placeholders remaining
- [ ] Content Brief 150-300 chars
- [ ] Design System 2500-3500 chars

## 🔧 Requirements

- Node.js 12+ (for running scripts)
- No external dependencies (uses only Node.js built-ins)

## 💡 Tips

**For Agents:**
- Run character-counter.js first to check overall length
- If over 4800 chars, compress Design System section
- Run placeholder-checker.js to catch unresolved placeholders
- Use slide-analyzer.js to optimize slide structure

**For Users:**
- Save generated prompts to .txt files for validation
- Use these tools before pasting into NotebookLM
- If character count is close to limit, remove some slide descriptions

## 📝 Example Workflow

```bash
# 1. Generate prompt (via agent or manual)
# 2. Save to file
echo "$GENERATED_PROMPT" > my-prompt.txt

# 3. Validate
node utils/placeholder-checker.js my-prompt.txt
node utils/character-counter.js my-prompt.txt
node utils/slide-analyzer.js my-prompt.txt

# 4. If all checks pass, use with NotebookLM
# 5. If issues found, regenerate with fixes
```

## 🐛 Troubleshooting

**"Error reading file"**
- Check file path is correct
- Ensure file has .txt extension
- Try using pipe instead: `cat file.txt | node script.js`

**"No slide structure found"**
- Ensure prompt has `[SLIDE STRUCTURE SUGGESTION]` section
- Check section markers are exact (case-sensitive)

**Character count seems wrong**
- Ensure file encoding is UTF-8
- Check for hidden characters or BOM markers
- Try: `file -I prompt.txt` to check encoding

## 📄 License

MIT License - Same as parent skill
