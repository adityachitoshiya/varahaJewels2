// API Route: /api/admin/coupons
import fs from 'fs';
import path from 'path';

const COUPONS_FILE = path.join(process.cwd(), 'data', 'coupons.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(COUPONS_FILE)) {
    const defaultCoupons = [
      {
        id: 'TESTADI',
        code: 'TESTADI',
        type: 'fixed',
        discount: 1,
        description: 'Test coupon - Sets final price to ₹1',
        status: 'active',
        usageLimit: null,
        usageCount: 0,
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(COUPONS_FILE, JSON.stringify(defaultCoupons, null, 2));
  }
};

export default async function handler(req, res) {
  ensureDataDirectory();

  if (req.method === 'GET') {
    // Get all coupons
    try {
      const data = fs.readFileSync(COUPONS_FILE, 'utf-8');
      const coupons = JSON.parse(data);
      return res.status(200).json({ success: true, coupons });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch coupons' });
    }
  }

  if (req.method === 'POST') {
    // Add new coupon
    try {
      const { code, type, discount, description, usageLimit } = req.body;

      if (!code || !type || !discount) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const data = fs.readFileSync(COUPONS_FILE, 'utf-8');
      const coupons = JSON.parse(data);

      // Check if coupon already exists
      if (coupons.find(c => c.code === code.toUpperCase())) {
        return res.status(400).json({ error: 'Coupon code already exists' });
      }

      const newCoupon = {
        id: code.toUpperCase(),
        code: code.toUpperCase(),
        type,
        discount: parseFloat(discount),
        description: description || '',
        status: 'active',
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        usageCount: 0,
        createdAt: new Date().toISOString()
      };

      coupons.push(newCoupon);
      fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2));

      return res.status(201).json({ success: true, coupon: newCoupon });
    } catch (error) {
      console.error('Add coupon error:', error);
      return res.status(500).json({ error: 'Failed to add coupon' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete coupon
    try {
      const { code } = req.query;

      const data = fs.readFileSync(COUPONS_FILE, 'utf-8');
      let coupons = JSON.parse(data);

      coupons = coupons.filter(c => c.code !== code);
      fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2));

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete coupon' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
