import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const products = [
  {
    name: 'Ethiopia Yirgacheffe',
    origin: 'Ethiopia',
    roastLevel: 'light',
    flavor: ['Jasmine', 'Lemon Zest', 'Peach'],
    price: 18.50,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1607687311762-e1027c5e0d80?q=80&w=600&auto=format&fit=crop',
    description: 'A delicate, tea-like body with bright floral notes of jasmine and clean citrus acidity. Hand-sorted and wet-processed in the Yirgacheffe highlands.',
    category: 'coffee',
  },
  {
    name: 'Kenya AA Nyeri',
    origin: 'Kenya',
    roastLevel: 'light',
    flavor: ['Blackberry', 'Blackcurrant', 'Grapefruit'],
    price: 20.00,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    description: 'Distinctive winey acidity and a heavy body loaded with rich, dark berry flavors. Produced by smallholder members of the Nyeri cooperatives.',
    category: 'coffee',
  },
  {
    name: 'Colombia El Paraiso',
    origin: 'Colombia',
    roastLevel: 'medium',
    flavor: ['Caramel', 'Red Apple', 'Pecan'],
    price: 19.00,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop',
    description: 'Sweet and well-balanced. Notes of warm caramel and crisp red apple with a toasted pecan finish. Double-anaerobic fermentation process.',
    category: 'coffee',
  },
  {
    name: 'Guatemala Huehuetenango',
    origin: 'Guatemala',
    roastLevel: 'medium',
    flavor: ['Milk Chocolate', 'Orange Peel', 'Honey'],
    price: 18.00,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
    description: 'A smooth, chocolatey base lifted by subtle sweet citrus and a honey-like finish. Grown in high-altitude volcanic soils near the Mexican border.',
    category: 'coffee',
  },
  {
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    roastLevel: 'dark',
    flavor: ['Cedar', 'Dark Chocolate', 'Earthy'],
    price: 17.50,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    description: 'Full-bodied and deeply complex with low acidity. Boasts robust earthy notes, cedar woodiness, and a bittersweet dark chocolate finish.',
    category: 'coffee',
  },
  {
    name: 'Kessel House Blend',
    origin: 'Multiple',
    roastLevel: 'medium',
    flavor: ['Cocoa', 'Brown Sugar', 'Almond'],
    price: 16.00,
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop',
    description: 'Our signature house espresso blend, crafted for consistency, rich crema, and comforting chocolatey, sweet almond notes. Perfect black or with milk.',
    category: 'coffee',
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared.');

    // Seed new products
    await Product.insertMany(products);
    console.log('Coffee products seeded successfully!');

    // Close connection
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
