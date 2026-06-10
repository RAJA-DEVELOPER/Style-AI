const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\russe\\\\Desktop\\\\dress';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /<a href="javascript:void\(0\);" class="nav-icon-wrapper" style="color: inherit;" aria-label="Search">\s*<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"\s*stroke-linejoin="round">\s*<circle cx="11" cy="11" r="8"><\/circle>\s*<line x1="21" y1="21" x2="16\.65" y2="16\.65"><\/line>\s*<\/svg>\s*<\/a>/g;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(regex, '');
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done removing search icons');
