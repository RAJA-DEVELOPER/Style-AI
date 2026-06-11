$files = Get-ChildItem -Path 'C:\Users\russe\Desktop\dress' -Filter '*.html'

foreach ($file in $files) {
    # Read as UTF8 to get the corrupted representation, then we will replace the corrupted sequences
    # Actually, the file is now saved as UTF-8 with these literal corrupted characters because 
    # Get-Content without -Encoding read it as Windows-1252 and then Set-Content -Encoding UTF8 saved the misinterpreted bytes as actual UTF-8 characters.
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $content = $content.Replace('â€”', '—')
    $content = $content.Replace('Â·', '·')
    $content = $content.Replace('ðŸ“¦', '📦')
    $content = $content.Replace('HermÃ¨s', 'Hermès')
    $content = $content.Replace('Itâ€™s', 'It’s')
    $content = $content.Replace('â˜…', '★')
    $content = $content.Replace('â˜†', '☆')
    $content = $content.Replace('âœ“', '✓')
    $content = $content.Replace('âœ¨', '✨')
    
    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Fixed encoding in $($file.Name)"
}
