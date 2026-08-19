import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/lib/case-studies.ts',
  'src/routes/index.tsx',
  'src/routes/elite/index.tsx',
  'src/routes/newbuilding/index.tsx',
  'src/routes/secondary/index.tsx',
  'src/lib/regisseur-assets.ts'
];

function findAssetJsons(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findAssetJsons(filePath, list);
    } else if (file.endsWith('.asset.json')) {
      list.push(filePath);
    }
  });
  return list;
}

const allFiles = [...filesToUpdate, ...findAssetJsons('src/assets')];

allFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Restore .webp to .png/.jpg based on what exists
  const webpMatches = content.match(/"\/[^"]+\.webp"/g);
  if (webpMatches) {
    webpMatches.forEach(match => {
      const webpPath = match.slice(1, -1);
      const publicPath = path.join('public', webpPath);
      const pngPath = publicPath.replace('.webp', '.png');
      const jpgPath = publicPath.replace('.webp', '.jpg');
      
      let newExt = '';
      if (fs.existsSync(pngPath)) newExt = '.png';
      else if (fs.existsSync(jpgPath)) newExt = '.jpg';
      
      if (newExt) {
        const newPath = webpPath.replace('.webp', newExt);
        content = content.replace(new RegExp(webpPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        changed = true;
      }
    });
  }
  
  // Update content_type in asset.json
  if (filePath.endsWith('.asset.json') && changed) {
    if (content.includes('"content_type": "image/webp"')) {
        const urlMatch = content.match(/"url":\s*"([^"]+)"/);
        if (urlMatch) {
            const ext = path.extname(urlMatch[1]);
            const mime = (ext === '.png') ? 'image/png' : 'image/jpeg';
            content = content.replace(/"content_type":\s*"image\/webp"/, '"content_type": "' + mime + '"');
        }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Restored: ' + filePath);
  }
});
