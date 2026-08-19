import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PUBLIC_DIR = 'public';
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function findImages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

const images = findImages(PUBLIC_DIR);
console.log(`Found ${images.length} images to optimize.`);

const mapping = {};

images.forEach(imagePath => {
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(new RegExp(`${ext}$`), '.webp');
  
  try {
    console.log(`Optimizing: ${imagePath} -> ${webpPath}`);
    // Using convert command explicitly via nix run imagemagick
    execSync(`nix run nixpkgs#imagemagick -- convert "${imagePath}" -quality 75 "${webpPath}"`);
    
    // Create mapping from relative public path
    const publicOld = imagePath.startsWith('public/') ? imagePath.substring(6) : imagePath;
    const publicNew = webpPath.startsWith('public/') ? webpPath.substring(6) : webpPath;
    
    mapping[publicOld.startsWith('/') ? publicOld : '/' + publicOld] = publicNew.startsWith('/') ? publicNew : '/' + publicNew;
  } catch (err) {
    console.error(`Failed to optimize ${imagePath}:`, err.message);
  }
});

fs.writeFileSync('scripts/image-mapping.json', JSON.stringify(mapping, null, 2));
console.log('Image optimization complete. Mapping saved to scripts/image-mapping.json');
