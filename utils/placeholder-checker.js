#!/usr/bin/env node

/**
 * NotebookLM Placeholder Checker
 * 
 * Validates that all placeholders have been resolved in the generated prompt.
 * Catches common issues like unresolved language placeholders.
 * 
 * Usage: node placeholder-checker.js <prompt-file.txt>
 */

const fs = require('fs');

const PLACEHOLDER_PATTERNS = [
  {
    pattern: /\(the language what users requested in the prompt\)/gi,
    name: 'Language placeholder',
    fix: 'Replace with actual language (e.g., "English", "Hindi", "Spanish")'
  },
  {
    pattern: /But the language should be what users said in the prompt/gi,
    name: 'Language instruction note',
    fix: 'Remove this sentence entirely'
  },
  {
    pattern: /\[.*?\]/g,
    name: 'Bracketed placeholder',
    fix: 'Replace with actual content'
  },
  {
    pattern: /\{.*?\}/g,
    name: 'Curly brace placeholder',
    fix: 'Replace with actual content'
  },
  {
    pattern: /TODO|FIXME|XXX/gi,
    name: 'TODO marker',
    fix: 'Complete the implementation'
  },
  {
    pattern: /\(fill in\)|<fill in>|<insert.*?>/gi,
    name: 'Fill-in instruction',
    fix: 'Replace with actual content'
  }
];

function checkPlaceholders(text) {
  const issues = [];
  
  PLACEHOLDER_PATTERNS.forEach(({ pattern, name, fix }) => {
    const matches = [...text.matchAll(pattern)];
    
    matches.forEach(match => {
      const lineNumber = text.substring(0, match.index).split('\n').length;
      const line = text.split('\n')[lineNumber - 1];
      
      issues.push({
        type: name,
        line: lineNumber,
        match: match[0],
        context: line.trim(),
        fix
      });
    });
  });
  
  return issues;
}

function checkLanguageConsistency(text) {
  const issues = [];
  
  // Extract language mentions
  const languageMatches = [
    ...text.matchAll(/Language:\s*([A-Za-z]+)/gi),
    ...text.matchAll(/language for all slide text should be\s*([A-Za-z]+)/gi),
    ...text.matchAll(/\|\s*Language:\s*([A-Za-z]+)/gi)
  ];
  
  const languages = languageMatches.map(m => m[1].toLowerCase());
  const uniqueLanguages = [...new Set(languages)];
  
  if (uniqueLanguages.length > 1) {
    issues.push({
      type: 'Language inconsistency',
      languages: uniqueLanguages,
      message: `Multiple languages detected: ${uniqueLanguages.join(', ')}. Should be consistent throughout.`
    });
  }
  
  if (uniqueLanguages.length === 0) {
    issues.push({
      type: 'Missing language specification',
      message: 'No language specified in the prompt'
    });
  }
  
  return issues;
}

function checkMarkdownSymbols(text) {
  const issues = [];
  
  // Check if the "no markdown" warning is present
  const hasWarning = text.includes('Do not include Markdown symbols') || 
                     text.includes('Plain text only');
  
  if (!hasWarning) {
    issues.push({
      type: 'Missing markdown warning',
      message: 'Prompt should include: "Do not include Markdown symbols (#, *, **) in any slide text. Plain text only."'
    });
  }
  
  return issues;
}

function printReport(text) {
  const placeholderIssues = checkPlaceholders(text);
  const languageIssues = checkLanguageConsistency(text);
  const markdownIssues = checkMarkdownSymbols(text);
  
  const totalIssues = placeholderIssues.length + languageIssues.length + markdownIssues.length;
  
  const reset = '\x1b[0m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const red = '\x1b[31m';
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         NotebookLM Placeholder Validation                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  if (totalIssues === 0) {
    console.log(`${green}✅ All checks passed! No placeholders or issues found.${reset}\n`);
    return;
  }
  
  console.log(`${red}❌ Found ${totalIssues} issue(s)${reset}\n`);
  
  // Placeholder issues
  if (placeholderIssues.length > 0) {
    console.log(`${red}🔍 Unresolved Placeholders (${placeholderIssues.length}):${reset}\n`);
    
    placeholderIssues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue.type} (Line ${issue.line})`);
      console.log(`     Found: "${issue.match}"`);
      console.log(`     Context: ${issue.context.substring(0, 80)}...`);
      console.log(`     ${yellow}Fix: ${issue.fix}${reset}\n`);
    });
  }
  
  // Language issues
  if (languageIssues.length > 0) {
    console.log(`${yellow}🌍 Language Issues (${languageIssues.length}):${reset}\n`);
    
    languageIssues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue.type}`);
      console.log(`     ${issue.message}\n`);
    });
  }
  
  // Markdown issues
  if (markdownIssues.length > 0) {
    console.log(`${yellow}📝 Markdown Issues (${markdownIssues.length}):${reset}\n`);
    
    markdownIssues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue.type}`);
      console.log(`     ${issue.message}\n`);
    });
  }
  
  console.log(`${red}⚠️  Please resolve these issues before using the prompt with NotebookLM.${reset}\n`);
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
      printReport(input);
    });
    return;
  } else {
    console.error('Usage: node placeholder-checker.js <prompt-file.txt>');
    console.error('   or: cat prompt.txt | node placeholder-checker.js');
    process.exit(1);
  }
  
  printReport(input);
}

module.exports = { checkPlaceholders, checkLanguageConsistency, checkMarkdownSymbols };
