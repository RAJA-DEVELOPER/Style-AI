$files = Get-ChildItem -Path 'C:\Users\russe\Desktop\dress' -Filter '*.html'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Replace style="background: var(--text); color: var(--cards);" with class="... inverted-section" style="..."
    $content = $content -replace 'class="([^"]*)" style="([^"]*)background:\s*var\(--text\);\s*color:\s*var\(--(?:cards|background)\);([^"]*)"', 'class="$1 inverted-section" style="$2$3"'
    $content = $content -replace 'style="([^"]*)background:\s*var\(--text\);\s*color:\s*var\(--(?:cards|background)\);([^"]*)"', 'class="inverted-section" style="$1$2"'

    # 2. Replace style="background: var(--text); color: #fff;" with class="... inverted-section" style="..."
    $content = $content -replace 'class="([^"]*)" style="([^"]*)background:\s*var\(--text\);\s*color:\s*#fff;([^"]*)"', 'class="$1 inverted-section" style="$2$3"'
    $content = $content -replace 'style="([^"]*)background:\s*var\(--text\);\s*color:\s*#fff;([^"]*)"', 'class="inverted-section" style="$1$2"'

    # 3. Handle any rogue hardcoded #fff text colors inside inverted sections
    $content = $content -replace '<h2 style="color: #fff;', '<h2 style="'
    $content = $content -replace '<p style="color: rgba\(255,255,255,0\.8\);', '<p style="opacity: 0.8;'
    $content = $content -replace 'color: #fff;', 'color: var(--cards);'

    # 4. Clean up empty style="" if any were left
    $content = $content -replace ' style="\s*"', ''

    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Processed $($file.Name)"
}
