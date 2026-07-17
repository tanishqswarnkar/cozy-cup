import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapPath = path.join(__dirname, 'cloudinaryImageMap.json');
const cloudinaryMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Build photo ID to Cloudinary secure_url lookup table
const photoIdToUrl = {
  'photo-1514432324607': cloudinaryMap['s-1']?.secure_url,
  'photo-1541167760496': cloudinaryMap['s-2']?.secure_url,
  'photo-1485808191679': cloudinaryMap['s-3']?.secure_url,
  'photo-1577968897966': cloudinaryMap['s-4']?.secure_url,
  'photo-1517701604599': cloudinaryMap['s-6']?.secure_url,
  'photo-1461023058943': cloudinaryMap['s-7']?.secure_url,
  'photo-1551024709-8f23befc6f87': cloudinaryMap['s-8']?.secure_url,
  'photo-1572490122747': cloudinaryMap['s-9']?.secure_url,
  'photo-1536256263959': cloudinaryMap['s-10']?.secure_url,
  'photo-1515823662972': cloudinaryMap['s-11']?.secure_url,
  'photo-1576092768241': cloudinaryMap['s-12']?.secure_url,
  'photo-1555507036-ab1f4038808a': cloudinaryMap['s-13']?.secure_url,
  'photo-1509440159596': cloudinaryMap['s-14']?.secure_url,
  'photo-1606890737304': cloudinaryMap['s-15']?.secure_url,
  'photo-1528735602780': cloudinaryMap['s-16']?.secure_url,
  'photo-1509722747041': cloudinaryMap['s-17']?.secure_url,
  'photo-1626700051175': cloudinaryMap['s-19']?.secure_url,
  'photo-1558961363-fa8fdf82db35': cloudinaryMap['s-21']?.secure_url,
  'photo-1549007994-cb92caebd54b': cloudinaryMap['s-22']?.secure_url,
  'photo-1559056199-641a0ac8b55e': cloudinaryMap['s-23']?.secure_url,
  'photo-1610632380989': cloudinaryMap['s-25']?.secure_url,
  'photo-1587734195503': cloudinaryMap['s-26']?.secure_url,
  'photo-1495474472287': cloudinaryMap['s-27']?.secure_url,
  'photo-1509042239860': cloudinaryMap['s-28']?.secure_url,
  'photo-1544787219-7f47ccb76574': cloudinaryMap['s-29']?.secure_url,
  'photo-1501339847302': cloudinaryMap['hero-1']?.secure_url,
  'photo-1447933601403': cloudinaryMap['gallery-1']?.secure_url,
  'photo-1554118811-1e0d58224f24': cloudinaryMap['gallery-2']?.secure_url,
  'photo-1497935586351': cloudinaryMap['about-1']?.secure_url,
  'photo-1484723091791': cloudinaryMap['combo-1']?.secure_url,
  'photo-1607687311762': cloudinaryMap['combo-2']?.secure_url,
  'photo-1498804103079': cloudinaryMap['combo-3']?.secure_url,
};

let filesChanged = 0;
let totalReplacements = 0;

function walkAndReplace(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules')) {
        walkAndReplace(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace every Unsplash URL
      const newContent = content.replace(/https:\/\/images\.unsplash\.com\/(photo-[0-9a-f-]+)[^\s'\"\)]*/g, (match, photoId) => {
        // Find matching Cloudinary URL
        for (const [idKey, cloudUrl] of Object.entries(photoIdToUrl)) {
          if (cloudUrl && photoId.startsWith(idKey)) {
            totalReplacements++;
            modified = true;
            return cloudUrl;
          }
        }
        // If not exact prefix, fallback to hero-1 or s-1 Cloudinary URL
        if (cloudinaryMap['hero-1']?.secure_url) {
          totalReplacements++;
          modified = true;
          return cloudinaryMap['hero-1'].secure_url;
        }
        return match;
      });

      if (modified && newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        filesChanged++;
        console.log(`✅ Replaced images with Cloudinary in: ${path.relative(path.join(__dirname, '..'), fullPath)}`);
      }
    }
  }
}

console.log('⚡ Starting codebase replacement with Cloudinary URLs...');
walkAndReplace(path.join(__dirname, '../frontend/src'));
walkAndReplace(path.join(__dirname, 'seed'));
console.log(`\n🎉 Success! Updated ${filesChanged} files with ${totalReplacements} Cloudinary CDN URLs.`);
