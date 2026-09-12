param([string]$ObservationDate, [switch]$CollectOnly, [switch]$ExpandedOnly)
$ErrorActionPreference = 'Stop'
$bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
$scriptPath = Join-Path $PSScriptRoot 'collect_all.py'
$collectorArgs = @($scriptPath)
if ($ObservationDate) { $collectorArgs += @('--date', $ObservationDate) }
if ($ExpandedOnly) { $collectorArgs += '--expanded-only' }
elseif (-not $CollectOnly) { $collectorArgs += '--update-dashboard' }
if (Test-Path -LiteralPath $bundledPython) {
    & $bundledPython @collectorArgs
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    & python @collectorArgs
} else {
    throw 'Python 3.10+ is required. Install Python or use the Codex bundled runtime.'
}
exit $LASTEXITCODE
