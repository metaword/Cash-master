$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Cash Master Server Running Successfully! " -ForegroundColor Green
Write-Host " Local URL: http://localhost:$port/        " -ForegroundColor Yellow
Write-Host " Press Ctrl+C in this window to stop.     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Green

Start-Process "http://localhost:$port/"

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }

        # APIs
        if ($path -eq "/down/get_apk") {
            $json = '{"code":1,"url":"https://mastercash777.com/download/apkfb/2001/CashMasterV1.apk"}'
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.AppendHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }
        if ($path -eq "/down/get_url") {
            $json = '{"code":1,"url":"https://h5.mastercash777.com/index.html?a1=2001"}'
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.AppendHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        # Static files
        $relPath = $path.TrimStart("/").Replace("/", "\")
        $filePath = Join-Path $root $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".webp" { "image/webp" }
                ".json" { "application/json" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType
            $response.AppendHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
}
