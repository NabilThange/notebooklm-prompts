# NotebookLM Prompt Full Validation (PowerShell)
# Runs all validation checks in sequence
# Usage: .\validate-all.ps1 <prompt-file.txt>

param(
    [Parameter(Mandatory=$true)]
    [string]$PromptFile
)

if (-not (Test-Path $PromptFile)) {
    Write-Error "File not found: $PromptFile"
    exit 1
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     NotebookLM Prompt Full Validation Suite               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check 1: Placeholder validation
Write-Host "🔍 Running placeholder check..." -ForegroundColor Yellow
node "$ScriptDir\placeholder-checker.js" $PromptFile
$PlaceholderExit = $LASTEXITCODE

# Check 2: Character count
Write-Host "📊 Running character count analysis..." -ForegroundColor Yellow
node "$ScriptDir\character-counter.js" $PromptFile
$CharExit = $LASTEXITCODE

# Check 3: Slide structure
Write-Host "📝 Running slide structure analysis..." -ForegroundColor Yellow
node "$ScriptDir\slide-analyzer.js" $PromptFile
$SlideExit = $LASTEXITCODE

# Summary
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    Validation Summary                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

if ($PlaceholderExit -eq 0 -and $CharExit -eq 0 -and $SlideExit -eq 0) {
    Write-Host "✅ All validation checks passed!" -ForegroundColor Green
    Write-Host "   Your prompt is ready to use with NotebookLM." -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  Some validation checks found issues." -ForegroundColor Yellow
    Write-Host "   Review the reports above and fix before using with NotebookLM." -ForegroundColor Yellow
    exit 1
}
