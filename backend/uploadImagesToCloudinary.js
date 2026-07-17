import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || 'TANISHQ').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '696648131824876').trim(),
  api_secret: (process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_SECERT_KEY || 'lUXsNrGptkkmo0XOLoBDCufXzDs').trim(),
  secure: true
});

const imagesToUpload = [
  // Drinks & Espresso
  {
    id: 's-1',
    name: 'Double Espresso Cloud',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-2',
    name: 'Oat Milk Honey Latte',
    url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-3',
    name: 'Bergamot Jasmine Macchiato',
    url: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-4',
    name: 'Classic Flat White',
    url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-6',
    name: 'Nitro Honey Cold Brew',
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-7',
    name: 'Cold Brew Nitro Float',
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-8',
    name: 'Yuzu Tonic Espresso',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-9',
    name: 'Iced Mocha Frappe',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-10',
    name: 'Matcha Espresso Fusion',
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-11',
    name: 'Ceremonial Matcha Latte',
    url: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-12',
    name: 'Golden Turmeric Chai',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop'
  },

  // Bakery & Food
  {
    id: 's-13',
    name: 'Cardamom Almond Croissant',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-14',
    name: 'Valrhona Chocolate Brioche',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-15',
    name: 'Gluten-Free Blueberry Loaf',
    url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-16',
    name: 'Avocado & Pesto Panini',
    url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-17',
    name: 'Prosciutto & Fig Tartine',
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-19',
    name: 'Spinach & Feta Breakfast Wrap',
    url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-21',
    name: 'Almond Biscotti Duo',
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-22',
    name: 'Artisanal Truffle Box',
    url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop'
  },

  // Coffee Beans & Merchandise
  {
    id: 's-23',
    name: 'Yirgacheffe, Ethiopia Bag',
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 's-25',
    name: 'Mandheling, Sumatra Bag',
    url: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-26',
    name: 'Antigua, Guatemala Bag',
    url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-27',
    name: 'Nyeri AA, Kenya Bag',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-28',
    name: 'Tarrazú, Costa Rica Bag',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's-29',
    name: 'Pour-Over Glass Carafe Set',
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop'
  }
];

async function runUploads() {
  console.log('☁️  Connecting to Cloudinary Cloud:', cloudinary.config().cloud_name);
  
  try {
    const pingRes = await cloudinary.api.ping();
    console.log('✅ Cloudinary API Connection Verified:', pingRes);
  } catch (err) {
    console.error('❌ Cloudinary Connection Error:', err.message);
    console.log('⚠️ Continuing with upload attempt...');
  }

  const resultsMap = {};
  let successCount = 0;

  for (const item of imagesToUpload) {
    try {
      console.log(`📤 Uploading [${item.id}] ${item.name}...`);
      const response = await cloudinary.uploader.upload(item.url, {
        folder: 'cozy_cup_products',
        public_id: item.id,
        overwrite: true,
        resource_type: 'image'
      });
      console.log(`   ✨ Saved: ${response.secure_url}`);
      resultsMap[item.id] = {
        name: item.name,
        secure_url: response.secure_url,
        public_id: response.public_id
      };
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed [${item.id}]:`, err.message);
    }
  }

  const outputPath = path.join(__dirname, 'cloudinaryImageMap.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultsMap, null, 2));
  console.log(`\n🎉 Upload Complete! Successfully uploaded ${successCount}/${imagesToUpload.length} images to Cloudinary.`);
  console.log(`Saved mapping to: ${outputPath}`);
}

runUploads();
