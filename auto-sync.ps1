<#
.SYNOPSIS
    Script tự động đồng bộ (Auto Commit & Push) Git định kỳ cho repository.
.DESCRIPTION
    Tự động kiểm tra thay đổi file mỗi X giây. Nếu có thay đổi, tự động git add, git commit và git push.
#>

param(
    [int]$IntervalSeconds = 300, # Mặc định 5 phút (300 giây)
    [string]$RepoPath = $PSScriptRoot
)

Set-Location $RepoPath
$Host.UI.RawUI.WindowTitle = "Git Auto-Sync Watcher - $(Split-Path $RepoPath -Leaf)"

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "       GIT AUTO-SYNC WATCHER (Chế độ tự động)        " -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Thư mục theo dõi: $RepoPath" -ForegroundColor White
Write-Host "Chu kỳ kiểm tra: $IntervalSeconds giây" -ForegroundColor White
Write-Host "Nhấn Ctrl + C để dừng bất cứ lúc nào.`n" -ForegroundColor Gray

# Kiểm tra git repository
$isGit = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Thư mục không phải là một Git repository!" -ForegroundColor Red
    pause
    exit 1
}

# Lấy branch hiện tại
$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
if (-not $currentBranch) {
    $currentBranch = "main"
}
Write-Host "[INIT] Branch đang làm việc: $currentBranch" -ForegroundColor Green

while ($true) {
    $now = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    try {
        # Kiểm tra trạng thái thay đổi
        $status = git status --porcelain
        
        if ($status) {
            Write-Host "`n[$now] [PHÁT HIỆN THAY ĐỔI] Đang chuẩn bị đồng bộ..." -ForegroundColor Yellow
            
            # Liệt kê các file thay đổi ngắn gọn
            $changedCount = ($status | Measure-Object).Count
            Write-Host "-> Có $changedCount tệp tin được cập nhật/thêm mới." -ForegroundColor Gray
            
            # Pull nhẹ trước để tránh xung đột nếu có commit mới từ remote
            git pull --rebase origin $currentBranch 2>$null
            
            # Add tất cả thay đổi
            git add -A
            
            # Commit với timestamp
            $commitMsg = "auto-sync: $now"
            git commit -m $commitMsg
            
            # Push lên branch
            Write-Host "-> Đang đẩy code lên origin/$currentBranch..." -ForegroundColor Yellow
            $pushResult = git push origin $currentBranch 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$now] [THÀNH CÔNG] Đã đồng bộ lên GitHub thành công!" -ForegroundColor Green
            } else {
                Write-Host "[$now] [CẢNH BÁO PUSH THẤT BẠI] Có lỗi xảy ra khi push:" -ForegroundColor Red
                Write-Host $pushResult -ForegroundColor DarkRed
            }
        } else {
            # Kiểm tra xem có commit local nào chưa push không
            $unpushed = git log "origin/$currentBranch..HEAD" --oneline 2>$null
            if ($unpushed) {
                Write-Host "`n[$now] [CÓ COMMIT CHƯA PUSH] Đang push lên GitHub..." -ForegroundColor Yellow
                git push origin $currentBranch 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$now] [THÀNH CÔNG] Đã push các commit trước đó!" -ForegroundColor Green
                }
            } else {
                Write-Host "[$now] Không có thay đổi mới. Đang tiếp tục theo dõi..." -ForegroundColor DarkGray
            }
        }
    }
    catch {
        Write-Host "[$now] [LỖI NGOẠI LỆ]: $_" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds $IntervalSeconds
}
