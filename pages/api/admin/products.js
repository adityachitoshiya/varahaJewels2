// API Route: /api/admin/products
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
  }
};

export default async function handler(req, res) {
  ensureDataDirectory();

  if (req.method === 'GET') {
    // Get all products
    try {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const products = JSON.parse(data);
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    // Add new product
    try {
      const { name, description, price, category, images, variants } = req.body;

      if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
      }

      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const products = JSON.parse(data);

      const productId = `prod_${Date.now()}`;
      const newProduct = {
        id: productId,
        name,
        description: description || '',
        price: parseFloat(price),
        category: category || 'Uncategorized',
        images: images || [],
        variants: variants || [],
        status: 'active',
        createdAt: new Date().toISOString()
      };

      products.push(newProduct);
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

      return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error('Add product error:', error);
      return res.status(500).json({ error: 'Failed to add product' });
    }
  }

  if (req.method === 'PUT') {
    // Update product
    try {
      const { id, name, description, price, category, status } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      let products = JSON.parse(data);

      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }

      products[productIndex] = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        description: description || products[productIndex].description,
        price: price ? parseFloat(price) : products[productIndex].price,
        category: category || products[productIndex].category,
        status: status || products[productIndex].status,
        updatedAt: new Date().toISOString()
      };

      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

      return res.status(200).json({ success: true, product: products[productIndex] });
    } catch (error) {
      console.error('Update product error:', error);
      return res.status(500).json({ error: 'Failed to update product' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete product
    try {
      const { id } = req.query;

      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      let products = JSON.parse(data);

      products = products.filter(p => p.id !== id);
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
