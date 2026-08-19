import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Check for ImageMagick (convert or magick)
let convertCmd = '';
try {
  execSync('magick -version', { stdio: 'ignore' });
  convertCmd = 'magick';
} catch (e) {
  try {
    execSync('convert -version', { stdio: 'ignore' });
    convertCmd = 'convert';
  } catch (e2) {
    console.error('Error: ImageMagick (convert or magick) is not installed.');
    process.exit(1);
  }
}

console.log(`Using ImageMagick command: ${convertCmd}`);

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const assetsDirs = [
  path.join(rootDir, 'public/__l5e'),
  path.join(rootDir, 'public/images'),
  path.join(rootDir, 'src/assets')
];

let totalConverted = 0;
const mapping = {};

assetsDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  console.log(`Processing directory: ${dir}`);
  const files = getAllFiles(dir);

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (IMG_EXTENSIONS.includes(ext)) {
      const webpFile = file.substring(0, file.length - ext.length) + '.webp';
      
      try {
        // Convert to WebP
        execSync(`${convertCmd} "${file}" -quality 75 "${webpFile}"`);
        console.log(`Converted: ${path.relative(rootDir, file)} -> .webp`);
        
        // Remove original to avoid confusion and force WebP usage
        fs.unlinkSync(file);
        
        totalConverted++;
        
        // Track for reference updates
        const relOriginal = path.relative(rootDir, file);
        const relWebp = path.relative(rootDir, webpFile);
        mapping[relOriginal] = relWebp;
      } catch (err) {
        console.error(`Failed to convert ${file}: ${err.message}`);
      }
    }
  });
});

// Update .asset.json files
const srcAssetsDir = path.join(rootDir, 'src/assets');
if (fs.existsSync(srcAssetsDir)) {
  const allFiles = getAllFiles(srcAssetsDir);
  allFiles.forEach(file => {
    if (file.endsWith('.asset.json')) {
      try {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        let changed = false;
        
        // The URL usually points to the image file
        // e.g. "url": "https://.../regisseur-1.png" -> needs to be .webp
        if (content.url && (content.url.endsWith('.png') || content.url.endsWith('.jpg') || content.url.endsWith('.jpeg'))) {
          const oldUrl = content.url;
          const ext = path.extname(oldUrl);
          content.url = oldUrl.substring(0, oldUrl.length - ext.length) + '.webp';
          content.content_type = 'image/webp';
          changed = true;
          console.log(`Updated asset JSON: ${path.relative(rootDir, file)}`);
        }
        
        if (changed) {
          fs.writeFileSync(file, JSON.stringify(content, null, 2));
        }
      } catch (err) {
        console.error(`Error processing asset JSON ${file}: ${err.message}`);
      }
    }
  });
}

// Update code references in src/lib/case-studies.ts and src/routes/index.tsx
const filesToUpdate = [
  path.join(rootDir, 'src/lib/case-studies.ts'),
  path.join(rootDir, 'src/routes/index.tsx'),
  path.join(rootDir, 'src/lib/regisseur-assets.ts')
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    IMG_EXTENSIONS.forEach(ext => {
      // Replace extensions in strings, e.g. ".jpg" -> ".webp"
      // Using a regex to catch them in quotes or paths
      const regex = new RegExp(`\\${ext}(?=["'\\s])`, 'g');
      content = content.replace(regex, '.webp');
    });

    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`Updated code file: ${path.relative(rootDir, file)}`);
    }
  }
});

console.log(`\nSuccess! Converted ${totalConverted} images to WebP and updated references.`);
