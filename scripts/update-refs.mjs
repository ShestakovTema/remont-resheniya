import fs from 'fs';
import path from 'path';

const mappingFile = 'scripts/image-mapping.json';
if (!fs.existsSync(mappingFile)) {
  console.error('Mapping file not found!');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Files to update
const filesToUpdate = [
  'src/lib/case-studies.ts',
  'src/routes/index.tsx',
  'src/routes/elite/index.tsx',
  'src/routes/newbuilding/index.tsx',
  'src/routes/secondary/index.tsx'
];

// Also scan src/assets for .asset.json files
function findAssetJsons(dir, list = []) {
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

const assetFiles = findAssetJsons('src/assets');
const allFiles = [...filesToUpdate, ...assetFiles];

allFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(mapping).forEach(([oldPath, newPath]) => {
    // Escape for regex
    const escapedOld = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Check if the content contains the old path
    if (content.includes(oldPath)) {
      const regex = new RegExp(escapedOld, 'g');
      content = content.replace(regex, newPath);
      changed = true;
    }
    
    // If it's an asset.json, we should also update content_type if we're replacing the URL
    if (filePath.endsWith('.asset.json') && content.includes(newPath)) {
      if (content.includes('"content_type": "image/jpeg"') || content.includes('"content_type": "image/jpg"') || content.includes('"content_type": "image/png"')) {
         content = content.replace(/"content_type": "image\/(jpeg|jpg|png)"/, '"content_type": "image/webp"');
         changed = true;
      }
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated references in ${filePath}`);
  }
});

console.log('Reference update complete.');
