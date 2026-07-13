import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true,
  },
  roastLevel: {
    type: String,
    required: [true, 'Roast level is required'],
    enum: ['light', 'medium', 'dark'],
    lowercase: true,
  },
  flavor: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  weight: {
    type: String, // e.g., "250g", "12oz", "1kg"
    required: [true, 'Weight is required'],
  },
  image: {
    type: String, // URL or image path
    default: '',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    enum: ['coffee', 'gear', 'merchandise'],
    default: 'coffee',
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
