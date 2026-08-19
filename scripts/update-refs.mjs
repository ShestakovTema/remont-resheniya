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
  'src/routes/secondary/index.tsx',
  'src/lib/regisseur-assets.ts'
];

// Also scan src/assets for .asset.json files
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

const assetFiles = findAssetJsons('src/assets');
const allFiles = [...filesToUpdate, ...assetFiles];

allFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(mapping).forEach(([oldPath, newPath]) => {
    // If it's an asset.json, we need to handle it specially to update content_type
    if (filePath.endsWith('.asset.json')) {
        // Find the "url" property
        const urlMatch = content.match(/"url":\s*"([^"]+)"/);
        if (urlMatch && urlMatch[1] === oldPath) {
             content = content.replace(urlMatch[0], `"url": "${newPath}"`);
             changed = true;
             
             // Update content_type
             if (content.includes('"content_type": "image/jpeg"') || 
                 content.includes('"content_type": "image/jpg"') || 
                 content.includes('"content_type": "image/png"')) {
                 content = content.replace(/"content_type":\s*"image\/(jpeg|jpg|png)"/, '"content_type": "image/webp"');
             }
        }
    } else {
        // For other files, simple replace if it exists
        if (content.includes(oldPath)) {
            const escapedOld = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedOld, 'g');
            content = content.replace(regex, newPath);
            changed = true;
        }
        
        // Also handle the case where it might be referring to the extension only in some contexts
        // But usually, these are full paths in this project.
    }
  });
  
  // Special case for missing interior-1600607687920-4e2a09cf159d.webp and interior-1618221195710-dd6b41faaea6.webp
  if (content.includes('interior-1600607687920-4e2a09cf159d.webp')) {
      content = content.replace(/interior-1600607687920-4e2a09cf159d\.webp/g, 'interior-1600607687920-4e2a09cf159d.jpg');
      changed = true;
  }
  if (content.includes('interior-1618221195710-dd6b41faaea6.webp')) {
      content = content.replace(/interior-1618221195710-dd6b41faaea6\.webp/g, 'interior-1618221195710-dd6b41faaea6.jpg');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated references in ${filePath}`);
  }
});

console.log('Reference update complete.');
