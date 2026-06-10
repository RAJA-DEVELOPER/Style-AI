const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\russe\\Desktop\\dress';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text color #fff to var(--cards) when background is var(--text)
    // We'll use a regex that matches a CSS block containing background: var(--text) and color: #fff
    
    // Simple approach: split by '}' and process each block
    let blocks = content.split('}');
    let modified = false;
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        if (block.includes('var(--text)')) {
            if (block.includes('color: #fff;') || block.includes('color: #ffffff;')) {
                blocks[i] = block.replace(/color:\s*#(fff|ffffff);/g, 'color: var(--cards);');
                modified = true;
            }
            if (block.includes('border-bottom-color: #fff;')) {
                blocks[i] = block.replace(/border-bottom-color:\s*#fff;/g, 'border-bottom-color: var(--cards);');
                modified = true;
            }
            if (block.includes('border-top-color: #fff;')) {
                blocks[i] = block.replace(/border-top-color:\s*#fff;/g, 'border-top-color: var(--cards);');
                modified = true;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, blocks.join('}'), 'utf8');
        console.log('Fixed contrast in ' + file);
    }
});
