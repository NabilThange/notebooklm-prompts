#!/bin/bash

# NotebookLM Prompt Full Validation
# Runs all validation checks in sequence
# Usage: ./validate-all.sh <prompt-file.txt>

if [ -z "$1" ]; then
  echo "Usage: ./validate-all.sh <prompt-file.txt>"
  echo "   or: cat prompt.txt | ./validate-all.sh"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$1"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     NotebookLM Prompt Full Validation Suite               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check 1: Placeholder validation
echo "🔍 Running placeholder check..."
node "$SCRIPT_DIR/placeholder-checker.js" "$PROMPT_FILE"
PLACEHOLDER_EXIT=$?

# Check 2: Character count
echo "📊 Running character count analysis..."
node "$SCRIPT_DIR/character-counter.js" "$PROMPT_FILE"
CHAR_EXIT=$?

# Check 3: Slide structure
echo "📝 Running slide structure analysis..."
node "$SCRIPT_DIR/slide-analyzer.js" "$PROMPT_FILE"
SLIDE_EXIT=$?

# Summary
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Validation Summary                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

if [ $PLACEHOLDER_EXIT -eq 0 ] && [ $CHAR_EXIT -eq 0 ] && [ $SLIDE_EXIT -eq 0 ]; then
  echo "✅ All validation checks passed!"
  echo "   Your prompt is ready to use with NotebookLM."
  exit 0
else
  echo "⚠️  Some validation checks found issues."
  echo "   Review the reports above and fix before using with NotebookLM."
  exit 1
fi
