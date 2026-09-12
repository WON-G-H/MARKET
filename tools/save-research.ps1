param(
    [ValidateSet('template','check','apply')][string]$Action = 'check',
    [string]$File,
    [string]$Date,
    [switch]$AllowRevision,
    [string]$ExpectedHash
)
$ErrorActionPreference = 'Stop'
$bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
$resultArgs = @('-B', (Join-Path $PSScriptRoot 'research_result.py'), $Action)
if ($Action -eq 'template') {
    if ($Date) { $resultArgs += @('--date', $Date) }
} else {
    if (-not $File) { throw '-File is required for check/apply.' }
    $resultArgs += $File
    if ($AllowRevision) { $resultArgs += '--allow-revision' }
    if ($ExpectedHash) { $resultArgs += @('--expected-hash', $ExpectedHash) }
}
if (Test-Path -LiteralPath $bundledPython) { & $bundledPython @resultArgs }
elseif (Get-Command python -ErrorAction SilentlyContinue) { & python @resultArgs }
else { throw 'Python 3.10+ is required.' }
exit $LASTEXITCODE
