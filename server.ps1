param (
    [int]$Port = 5173
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$distPath = Join-Path $scriptDir "dist"

if (-not (Test-Path $distPath)) {
    Write-Error "Thu muc dist khong ton tai tai: $distPath"
    exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
} catch {
    Write-Warning "Port $Port dang ban hoac khong the mo, thu chuyen sang port 8080..."
    $Port = 8080
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  Web server da khoi chay thanh cong!" -ForegroundColor Cyan
Write-Host "  Dia chi: http://localhost:$Port/" -ForegroundColor Yellow
Write-Host "  Thu muc goc: $distPath" -ForegroundColor Gray
Write-Host "  Nhan Ctrl+C de dung server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

$mimeTypes = @{
    '.html'  = 'text/html; charset=utf-8'
    '.css'   = 'text/css; charset=utf-8'
    '.js'    = 'application/javascript; charset=utf-8'
    '.mjs'   = 'application/javascript; charset=utf-8'
    '.json'  = 'application/json; charset=utf-8'
    '.png'   = 'image/png'
    '.jpg'   = 'image/jpeg'
    '.jpeg'  = 'image/jpeg'
    '.gif'   = 'image/gif'
    '.svg'   = 'image/svg+xml'
    '.ico'   = 'image/x-icon'
    '.webp'  = 'image/webp'
    '.woff'  = 'font/woff'
    '.woff2' = 'font/woff2'
    '.ttf'   = 'font/ttf'
    '.eot'   = 'application/vnd.ms-fontobject'
    '.mp4'   = 'video/mp4'
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq '/') { 
            $urlPath = '/index.html' 
        }

        # Chuyen url thanh file path tuong doi
        $relPath = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $targetFile = Join-Path $distPath $relPath

        # SPA fallback: neu file khong ton tai va khong co phan mo rong, hoac la route SPA thi tra ve index.html
        if (-not (Test-Path $targetFile -PathType Leaf)) {
            $targetFile = Join-Path $distPath "index.html"
        }

        if (Test-Path $targetFile -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }

            $response.ContentType = $contentType
            $response.StatusCode = 200
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            $bytes = [System.IO.File]::ReadAllBytes($targetFile)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Server da dung." -ForegroundColor Red
}
