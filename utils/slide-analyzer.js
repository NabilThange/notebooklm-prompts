#!/usr/bin/env node

/**
 * NotebookLM Slide Structure Analyzer
 * 
 * Analyzes the slide structure section to show character distribution per slide.
 * Helps identify which slides are too verbose.
 * 
 * Usage: node slide-analyzer.js <prompt-file.txt>
 */

const fs = require('fs');

function extractSlideStructure(text) {
  const startMarker = '[SLIDE STRUCTURE SUGGESTION]';
  const endMarker = '[LANGUAGE & TONE INSTRUCTION]';
  
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return null;
  
  const contentStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, contentStart);
  
  if (endIndex === -1) return null;
  
  return text.substring(contentStart, endIndex).trim();
}

function parseSlides(slideText) {
  const lines = slideText.split('\n').filter(line => line.trim());
  const slides = [];
  
  for (const line of lines) {
    // Match patterns like "- Slide 1:" or "Slide 1:" or "1."
    const match = line.match(/^[\s\-•]*(?:Slide\s+)?(\d+)[\s:.\-]+(.+)$/i);
    if (match) {
      const slideNum = parseInt(match[1]);
      const content = match[2].trim();
      slides.push({ num: slideNum, content, chars: content.length });
    }
  }
  
  return slides;
}

function analyzeSlides(slides) {
  const totalChars = slides.reduce((sum, s) => sum + s.chars, 0);
  const avgChars = totalChars / slides.length;
  const maxChars = Math.max(...slides.map(s => s.chars));
  const minChars = Math.min(...slides.map(s => s.chars));
  
  return { totalChars, avgChars, maxChars, minChars };
}

function formatBar(current, max, width = 30) {
  const filled = Math.floor((current / max) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function printSlideReport(slides) {
  if (!slides || slides.length === 0) {
    console.log('❌ No slide structure found in prompt');
    return;
  }
  
  const stats = analyzeSlides(slides);
  const reset = '\x1b[0m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const red = '\x1b[31m';
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         NotebookLM Slide Structure Analysis               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log(`📊 Overview:`);
  console.log(`   Total Slides: ${slides.length}`);
  console.log(`   Total Characters: ${stats.totalChars}`);
  console.log(`   Average per Slide: ${stats.avgChars.toFixed(0)} chars`);
  console.log(`   Range: ${stats.minChars} - ${stats.maxChars} chars\n`);
  
  console.log(`📝 Slide-by-Slide Breakdown:\n`);
  
  slides.forEach(slide => {
    let color = green;
    let status = '✅';
    
    if (slide.chars > 80) {
      color = red;
      status = '❌';
    } else if (slide.chars > 60) {
      color = yellow;
      status = '⚠️';
    }
    
    const bar = formatBar(slide.chars, stats.maxChars);
    console.log(`  ${status} Slide ${String(slide.num).padStart(2)}: ${color}${String(slide.chars).padStart(3)} chars${reset} ${bar}`);
    console.log(`     ${slide.content.substring(0, 70)}${slide.content.length > 70 ? '...' : ''}\n`);
  });
  
  console.log(`💡 Recommendations:\n`);
  
  if (slides.length > 10) {
    console.log(`  ⚠️  You have ${slides.length} slides. Consider reducing to 8-10 for better character efficiency.`);
  }
  
  const verboseSlides = slides.filter(s => s.chars > 80);
  if (verboseSlides.length > 0) {
    console.log(`  ❌ ${verboseSlides.length} slide(s) exceed 80 characters:`);
    verboseSlides.forEach(s => {
      console.log(`     • Slide ${s.num}: ${s.chars} chars - "${s.content.substring(0, 50)}..."`);
    });
    console.log(`  → Shorten these to 40-60 characters each`);
  }
  
  const warningSlides = slides.filter(s => s.chars > 60 && s.chars <= 80);
  if (warningSlides.length > 0) {
    console.log(`  ⚠️  ${warningSlides.length} slide(s) are 60-80 characters (consider shortening)`);
  }
  
  if (stats.avgChars > 60) {
    console.log(`  → Average slide length (${stats.avgChars.toFixed(0)} chars) is high. Target: 40-60 chars per slide.`);
  } else if (stats.avgChars < 40) {
    console.log(`  ✅ Slide lengths are efficient (avg ${stats.avgChars.toFixed(0)} chars)`);
  } else {
    console.log(`  ✅ Slide lengths are well-optimized (avg ${stats.avgChars.toFixed(0)} chars)`);
  }
  
  console.log('\n');
}

// Main execution
if (require.main === module) {
  let input = '';
  
  if (process.argv[2]) {
    try {
      input = fs.readFileSync(process.argv[2], 'utf8');
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }
  } else if (!process.stdin.isTTY) {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => input += chunk);
    process.stdin.on('end', () => {
      const slideText = extractSlideStructure(input);
      const slides = parseSlides(slideText);
      printSlideReport(slides);
    });
    return;
  } else {
    console.error('Usage: node slide-analyzer.js <prompt-file.txt>');
    console.error('   or: cat prompt.txt | node slide-analyzer.js');
    process.exit(1);
  }
  
  const slideText = extractSlideStructure(input);
  const slides = parseSlides(slideText);
  printSlideReport(slides);
}

module.exports = { extractSlideStructure, parseSlides, analyzeSlides };
