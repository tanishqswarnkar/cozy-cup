import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function optimizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace raw /image/upload/v... or /image/upload/... with /image/upload/f_auto,q_auto/... if not already optimized
  content = content.replace(/https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?!f_auto,q_auto\/)(v[0-9]+\/cozy_cup_[a-zA-Z0-9_-]+\/[^"'\s\)]+)/g, (match, cloudName, restOfUrl) => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${restOfUrl}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`⚡ Optimized Cloudinary URLs (f_auto,q_auto) in: ${path.relative(path.join(__dirname, '..'), filePath)}`);
    return 1;
  }
  return 0;
}

let modifiedFiles = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && !p.includes('node_modules')) {
      walk(p);
    } else if (p.endsWith('.jsx') || p.endsWith('.js') || p.endsWith('.json')) {
      modifiedFiles += optimizeFile(p);
    }
  });
}

console.log('🚀 Upgrading all Cloudinary URLs across repo to ultra-fast f_auto,q_auto...');
walk(path.join(__dirname, '../frontend/src'));
walk(path.join(__dirname, 'seed'));
optimizeFile(path.join(__dirname, 'cloudinaryImageMap.json'));

console.log(`\n✨ Done! Successfully optimized Cloudinary URLs across ${modifiedFiles} files.`);
