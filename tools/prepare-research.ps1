param(
    [ValidateSet('daily','weekly','regime','idea')][string]$Mode = 'daily',
    [string]$Date,
    [string]$IdeaId,
    [string[]]$Query,
    [string[]]$Source,
    [int]$MaxChars
)
$ErrorActionPreference = 'Stop'
$bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
$contextArgs = @('-B', (Join-Path $PSScriptRoot 'research_context.py'), $Mode)
if ($Date) { $contextArgs += @('--date', $Date) }
if ($IdeaId) { $contextArgs += @('--idea-id', $IdeaId) }
foreach ($term in $Query) { $contextArgs += @('--query', $term) }
foreach ($file in $Source) { $contextArgs += @('--source', $file) }
if ($MaxChars) { $contextArgs += @('--max-chars', $MaxChars.ToString()) }
if (Test-Path -LiteralPath $bundledPython) {
    & $bundledPython @contextArgs
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    & python @contextArgs
} else {
    throw 'Python 3.10+ is required.'
}
exit $LASTEXITCODE
