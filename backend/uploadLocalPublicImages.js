import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || 'hru3yyo1').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '696648131824876').trim(),
  api_secret: (process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_SECERT_KEY || 'lUXsNrGptkkmo0XOLoBDCufXzDs').trim(),
  secure: true
});

const localFiles = [
  { file: 'cozy-cup-logo.png', id: 'cozy-cup-logo', pattern: /\/cozy-cup-logo\.png/g },
  { file: 'coffee-auth-bg.png', id: 'coffee-auth-bg', pattern: /\/coffee-auth-bg\.png/g },
  { file: 'coffee-beans-bg.png', id: 'coffee-beans-bg', pattern: /\/coffee-beans-bg\.png/g },
];

async function run() {
  console.log('☁️  Uploading local public images to Cloudinary...');
  const urlMap = {};

  for (const item of localFiles) {
    const filePath = path.join(__dirname, '../frontend/public', item.file);
    if (fs.existsSync(filePath)) {
      try {
        console.log(`📤 Uploading local file ${item.file}...`);
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'cozy_cup_static',
          public_id: item.id,
          overwrite: true,
          resource_type: 'image'
        });
        console.log(`   ✨ Saved to Cloudinary: ${res.secure_url}`);
        urlMap[item.file] = {
          cloudUrl: res.secure_url,
          pattern: item.pattern,
          filePath
        };
      } catch (err) {
        console.error(`   ❌ Failed uploading ${item.file}:`, err.message);
      }
    } else {
      console.log(`   ℹ️ Local file ${item.file} already deleted or moved.`);
    }
  }

  // Replace references across frontend/src
  let filesModified = 0;
  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory() && !p.includes('node_modules')) {
        walk(p);
      } else if (p.endsWith('.jsx') || p.endsWith('.js') || p.endsWith('.html')) {
        let content = fs.readFileSync(p, 'utf8');
        let modified = false;

        for (const [fileName, data] of Object.entries(urlMap)) {
          if (content.includes(`/${fileName}`)) {
            content = content.replace(data.pattern, data.cloudUrl);
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(p, content, 'utf8');
          filesModified++;
          console.log(`✅ Replaced local static image path in: ${path.relative(path.join(__dirname, '..'), p)}`);
        }
      }
    });
  }

  walk(path.join(__dirname, '../frontend/src'));
  walk(path.join(__dirname, '../frontend'));

  // Now delete the local image files as requested
  for (const [fileName, data] of Object.entries(urlMap)) {
    if (fs.existsSync(data.filePath)) {
      fs.unlinkSync(data.filePath);
      console.log(`🗑️  Deleted local file: ${fileName}`);
    }
  }

  console.log(`\n🎉 All local images uploaded to Cloudinary, replaced across ${filesModified} files, and deleted locally!`);
}

run();
