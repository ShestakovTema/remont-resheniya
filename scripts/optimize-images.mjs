import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PUBLIC_DIR = 'public';
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function findImages(dir, fileList = []) {
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
    // Using magick to convert to webp with quality 75
    execSync(`nix run nixpkgs#imagemagick -- "${imagePath}" -quality 75 "${webpPath}"`);
    
    // Also remove the original to save space in the bundle if requested, 
    // but here we just want to replace references. 
    // Actually, I'll keep originals for a moment to ensure build doesn't break if I miss a ref.
    // But for "static export" and "hosting", we want to switch the code to use .webp.
    
    mapping[imagePath.replace(/^public\//, '/')] = webpPath.replace(/^public\//, '/');
  } catch (err) {
    console.error(`Failed to optimize ${imagePath}:`, err.message);
  }
});

fs.writeFileSync('scripts/image-mapping.json', JSON.stringify(mapping, null, 2));
console.log('Image optimization complete. Mapping saved to scripts/image-mapping.json');
