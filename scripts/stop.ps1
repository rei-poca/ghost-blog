# 一键停止 Ghost 本地博客
# 用法：在 PowerShell 中执行  .\scripts\stop.ps1

$ErrorActionPreference = "Stop"
$runtime = Join-Path (Split-Path $PSScriptRoot -Parent) "runtime"

Write-Host "==> Ghost 停止中..." -ForegroundColor Cyan
Set-Location $runtime
ghost stop
Write-Host "==> Ghost 已停止" -ForegroundColor Green
