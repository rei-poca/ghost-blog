# 一键启动 Ghost 本地博客（开发模式）
# 用法：在 PowerShell 中执行  .\scripts\start.ps1

$ErrorActionPreference = "Stop"
$runtime = Join-Path (Split-Path $PSScriptRoot -Parent) "runtime"

Write-Host "==> Ghost 启动中（运行目录：$runtime）..." -ForegroundColor Cyan
Set-Location $runtime
ghost start

Write-Host ""
Write-Host "前台地址:   http://localhost:2368/" -ForegroundColor Green
Write-Host "管理端地址: http://localhost:2368/ghost/" -ForegroundColor Green
