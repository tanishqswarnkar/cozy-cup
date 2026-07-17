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

const extraImages = [
  { id: 'hero-1', name: 'Hero Main Roast', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop' },
  { id: 'gallery-1', name: 'Gallery Barista Pour', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop' },
  { id: 'gallery-2', name: 'Gallery Espresso Shot', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop' },
  { id: 'about-1', name: 'About Roastery', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop' },
  { id: 'combo-1', name: 'Morning Boost Combo', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop' },
  { id: 'combo-2', name: 'Artisanal Pairing Combo', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' },
  { id: 'combo-3', name: 'Brewers Choice Combo', url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop' }
];

async function uploadExtras() {
  console.log('☁️  Uploading extra hero/combo/about images to Cloudinary:', cloudinary.config().cloud_name);
  
  const mapPath = path.join(__dirname, 'cloudinaryImageMap.json');
  const existingMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  for (const item of extraImages) {
    try {
      console.log(`📤 Uploading [${item.id}] ${item.name}...`);
      const response = await cloudinary.uploader.upload(item.url, {
        folder: 'cozy_cup_products',
        public_id: item.id,
        overwrite: true,
        resource_type: 'image'
      });
      console.log(`   ✨ Saved: ${response.secure_url}`);
      existingMap[item.id] = {
        name: item.name,
        secure_url: response.secure_url,
        public_id: response.public_id
      };
    } catch (err) {
      console.error(`   ❌ Failed [${item.id}]:`, err.message);
    }
  }

  fs.writeFileSync(mapPath, JSON.stringify(existingMap, null, 2));
  console.log(`🎉 Extra images merged into cloudinaryImageMap.json!`);
}

uploadExtras();
