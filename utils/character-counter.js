#!/usr/bin/env node

/**
 * NotebookLM Prompt Character Counter
 * 
 * Validates that generated prompts stay within NotebookLM's 5000 character limit.
 * Usage: node character-counter.js <prompt-file.txt>
 * Or: cat prompt.txt | node character-counter.js
 */

const fs = require('fs');

const NOTEBOOKLM_LIMIT = 5000;
const SAFE_LIMIT = 4800; // Leave buffer for user edits
const WARNING_LIMIT = 4500;

function analyzePrompt(text) {
  const totalChars = text.length;
  
  // Extract sections
  const sections = {
    contentBrief: extractSection(text, '[CONTENT BRIEF]', '[FULL DESIGN SYSTEM]'),
    designSystem: extractSection(text, '[FULL DESIGN SYSTEM]', '[SLIDE STRUCTURE SUGGESTION]'),
    slideStructure: extractSection(text, '[SLIDE STRUCTURE SUGGESTION]', '[LANGUAGE & TONE INSTRUCTION]'),
    languageTone: extractSection(text, '[LANGUAGE & TONE INSTRUCTION]', '═══════════════════════════════════════════\n💡 ALTERNATIVE STYLE'),
    alternative: extractSection(text, '💡 ALTERNATIVE STYLE', null)
  };

  // Count characters per section
  const breakdown = {
    contentBrief: sections.contentBrief.length,
    designSystem: sections.designSystem.length,
    slideStructure: sections.slideStructure.length,
    languageTone: sections.languageTone.length,
    alternative: sections.alternative.length,
    formatting: totalChars - Object.values(sections).reduce((sum, s) => sum + s.length, 0)
  };

  return { totalChars, breakdown, sections };
}

function extractSection(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + startMarker.length;
  
  if (!endMarker) {
    return text.substring(contentStart).trim();
  }
  
  const endIndex = text.indexOf(endMarker, contentStart);
  if (endIndex === -1) {
    return text.substring(contentStart).trim();
  }
  
  return text.substring(contentStart, endIndex).trim();
}

function getStatus(charCount) {
  if (charCount > NOTEBOOKLM_LIMIT) return { emoji: '❌', label: 'EXCEEDS LIMIT', color: '\x1b[31m' };
  if (charCount > SAFE_LIMIT) return { emoji: '⚠️', label: 'TOO CLOSE', color: '\x1b[33m' };
  if (charCount > WARNING_LIMIT) return { emoji: '⚡', label: 'NEAR LIMIT', color: '\x1b[33m' };
  return { emoji: '✅', label: 'SAFE', color: '\x1b[32m' };
}

function formatBar(current, max, width = 40) {
  const filled = Math.floor((current / max) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function printReport(analysis) {
  const { totalChars, breakdown } = analysis;
  const status = getStatus(totalChars);
  const reset = '\x1b[0m';
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         NotebookLM Prompt Character Analysis              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log(`${status.color}${status.emoji} Status: ${status.label}${reset}`);
  console.log(`Total Characters: ${status.color}${totalChars}${reset} / ${NOTEBOOKLM_LIMIT}`);
  console.log(`Progress: ${formatBar(totalChars, NOTEBOOKLM_LIMIT)}\n`);
  
  console.log('📊 Section Breakdown:\n');
  
  const sections = [
    { name: 'Content Brief', chars: breakdown.contentBrief, target: '150-300' },
    { name: 'Design System', chars: breakdown.designSystem, target: '2500-3500' },
    { name: 'Slide Structure', chars: breakdown.slideStructure, target: '400-600' },
    { name: 'Language/Tone', chars: breakdown.languageTone, target: '100-150' },
    { name: 'Alternative Style', chars: breakdown.alternative, target: '150-200' },
    { name: 'Formatting/Separators', chars: breakdown.formatting, target: '~200' }
  ];
  
  sections.forEach(section => {
    const percentage = ((section.chars / totalChars) * 100).toFixed(1);
    console.log(`  ${section.name.padEnd(25)} ${String(section.chars).padStart(4)} chars (${percentage}%)  [Target: ${section.target}]`);
  });
  
  console.log('\n💡 Recommendations:\n');
  
  if (totalChars > NOTEBOOKLM_LIMIT) {
    const excess = totalChars - SAFE_LIMIT;
    console.log(`  ❌ CRITICAL: Reduce by ${excess} characters to fit within safe limit`);
    console.log(`  → Focus on compressing the Design System section (currently ${breakdown.designSystem} chars)`);
  } else if (totalChars > SAFE_LIMIT) {
    const excess = totalChars - SAFE_LIMIT;
    console.log(`  ⚠️  WARNING: Only ${NOTEBOOKLM_LIMIT - totalChars} chars remaining`);
    console.log(`  → Consider reducing by ${excess} chars to leave buffer for user edits`);
  } else if (totalChars > WARNING_LIMIT) {
    console.log(`  ⚡ CAUTION: ${SAFE_LIMIT - totalChars} chars of buffer remaining`);
    console.log(`  → You're close to the limit. Avoid adding more content.`);
  } else {
    console.log(`  ✅ GOOD: ${SAFE_LIMIT - totalChars} chars of safe buffer remaining`);
  }
  
  // Specific recommendations
  if (breakdown.designSystem > 3500) {
    console.log(`  → Design System is large (${breakdown.designSystem} chars). Consider:`)
    console.log(`     • Removing redundant explanations`);
    console.log(`     • Shortening layout variation descriptions`);
    console.log(`     • Combining similar rules`);
  }
  
  if (breakdown.slideStructure > 600) {
    console.log(`  → Slide Structure is verbose (${breakdown.slideStructure} chars). Consider:`);
    console.log(`     • Reducing to 8-10 slides (not 12+)`);
    console.log(`     • Shortening slide titles to 40-60 chars`);
  }
  
  console.log('\n');
}

// Main execution
if (require.main === module) {
  let input = '';
  
  // Check if file argument provided
  if (process.argv[2]) {
    try {
      input = fs.readFileSync(process.argv[2], 'utf8');
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }
  } else if (!process.stdin.isTTY) {
    // Read from stdin (pipe)
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => input += chunk);
    process.stdin.on('end', () => {
      const analysis = analyzePrompt(input);
      printReport(analysis);
    });
    return;
  } else {
    console.error('Usage: node character-counter.js <prompt-file.txt>');
    console.error('   or: cat prompt.txt | node character-counter.js');
    process.exit(1);
  }
  
  const analysis = analyzePrompt(input);
  printReport(analysis);
}

module.exports = { analyzePrompt, getStatus };
