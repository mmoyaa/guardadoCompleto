#!/usr/bin/env powershell

# Script para ver los registros de RUT guardados
param(
    [string]$DbPath = "C:\Users\User\Documents\guardado-completo\Guardado-Completo\solicitudes.db"
)

# Verificar si la BD existe
if (-not (Test-Path $DbPath)) {
    Write-Host "❌ La base de datos no existe en: $DbPath" -ForegroundColor Red
    Write-Host "Asegúrate de haber registrado al menos un RUT primero" -ForegroundColor Yellow
    exit
}

Write-Host "📊 Registros de Solicitudes de Acceso RUT" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Instalar módulo PS-SQLite si no existe
if (-not (Get-Module -ListAvailable -Name PSSQLite)) {
    Write-Host "📦 Instalando módulo PSSQLite..." -ForegroundColor Yellow
    Install-Module -Name PSSQLite -Force -Confirm:$false
}

Import-Module PSSQLite

$Query = "SELECT id, rut, fecha_solicitud, estado, email_enviado FROM rut_solicitudes ORDER BY id DESC;"

try {
    $Results = Invoke-SqliteQuery -DataSource $DbPath -Query $Query
    
    if ($Results.Count -eq 0) {
        Write-Host "No hay registros aún" -ForegroundColor Yellow
    } else {
        $Results | ForEach-Object {
            Write-Host ""
            Write-Host "ID: $($_.id)" -ForegroundColor Cyan
            Write-Host "RUT: $($_.rut)" -ForegroundColor Cyan
            Write-Host "Fecha: $($_.fecha_solicitud)" -ForegroundColor Yellow
            Write-Host "Estado: $($_.estado)" -ForegroundColor Green
            Write-Host "Email Enviado: $(if($_.email_enviado -eq 1) {'✅ Sí'} else {'❌ No'})" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "❌ Error al consultar la BD: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host "Total de registros: $($Results.Count)" -ForegroundColor Green
