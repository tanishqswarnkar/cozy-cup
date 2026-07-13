import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { roastLevel, category, search } = req.query;
    const query = {};

    if (roastLevel) {
      query.roastLevel = roastLevel.toLowerCase();
    }

    if (category) {
      query.category = category.toLowerCase();
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, origin, roastLevel, flavor, price, weight, image, description, category } = req.body;

    const product = new Product({
      name,
      origin,
      roastLevel,
      flavor: Array.isArray(flavor) ? flavor : flavor.split(',').map(f => f.trim()),
      price,
      weight,
      image,
      description,
      category,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const { name, origin, roastLevel, flavor, price, weight, image, description, category, inStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.origin = origin || product.origin;
      product.roastLevel = roastLevel || product.roastLevel;
      if (flavor) {
        product.flavor = Array.isArray(flavor) ? flavor : flavor.split(',').map(f => f.trim());
      }
      product.price = price !== undefined ? price : product.price;
      product.weight = weight || product.weight;
      product.image = image || product.image;
      product.description = description || product.description;
      product.category = category || product.category;
      product.inStock = inStock !== undefined ? inStock : product.inStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};
