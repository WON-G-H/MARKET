param([switch]$NoOpen)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
Write-Host 'Market Ledger: updating Dashboard, Macro, Korea and Macro Calendar...'
Write-Host 'Please keep this window open until collection finishes.'
try {
    $started = Get-Date
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'collect-market.ps1')
    $result = $LASTEXITCODE
    if ($result -notin @(0, 2)) { throw "Collector failed (exit $result). Existing values may have been preserved." }
    $statusPath = Join-Path $projectRoot 'market-data/collection-status.json'
    if (-not (Test-Path -LiteralPath $statusPath)) { throw 'No collection report was written.' }
    $status = Get-Content -LiteralPath $statusPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if ([DateTimeOffset]::Parse($status.checkedAt).UtcDateTime -lt $started.ToUniversalTime()) {
        throw 'The report is from an earlier run; this update is not confirmed.'
    }
    Write-Host ''
    if ($result -eq 0) { Write-Host 'DONE: available market data updated.' -ForegroundColor Green }
    else { Write-Host 'PARTIAL: some sources failed. Successful data was updated; other values were kept.' -ForegroundColor Yellow }
    foreach ($warning in @($status.warnings) + @($status.expandedData.warnings) + @($status.calendar.warnings)) {
        if ($warning) { Write-Host ('- ' + $warning) }
    }
    Write-Host 'AI research text is unchanged. See observation dates on each page.'
    Write-Host 'If the site is already open, refresh it (Ctrl+F5).' 
    if (-not $NoOpen) { Start-Process -FilePath (Join-Path $projectRoot 'index.html') }
    exit $result
} catch {
    Write-Host ('FAILED: ' + $_.Exception.Message) -ForegroundColor Red
    Write-Host 'Keep this message for troubleshooting. Do not treat an old report as a new update.'
    exit 1
}
