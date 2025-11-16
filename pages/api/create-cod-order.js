import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      productId,
      variantId,
      quantity,
      amount,
      name,
      email,
      contact,
      address,
      couponCode,
      discount,
      paymentMethod,
      codCharges,
      items,
      isCartCheckout
    } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !address) {
      return res.status(400).json({ error: 'Missing required customer information' });
    }

    // Validate payment method
    if (paymentMethod !== 'cod') {
      return res.status(400).json({ error: 'Invalid payment method for COD order' });
    }

    // Generate unique order ID
    const orderId = `COD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order object
    const newOrder = {
      orderId,
      paymentId: `COD-${Date.now()}`,
      ...(isCartCheckout && items ? {
        items: items,
        productName: `${items.length} items`,
        quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      } : {
        productId,
        variantId,
        quantity: parseInt(quantity),
      }),
      amount: parseFloat(amount),
      paymentMethod: 'cod',
      codCharges: codCharges || 0,
      customerDetails: {
        name,
        email,
        contact,
        address,
      },
      couponCode: couponCode || null,
      discount: discount || 0,
      status: 'pending', // COD orders are pending until delivered
      paymentStatus: 'pending', // Will be paid on delivery
      createdAt: new Date().toISOString(),
      isCartCheckout: isCartCheckout || false,
    };

    // Read existing orders
    const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');
    let orders = [];

    try {
      const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
      orders = JSON.parse(ordersData);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      console.log('Creating new orders file');
      orders = [];
    }

    // Add new order
    orders.push(newOrder);

    // Write back to file
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    console.log('COD Order created successfully:', orderId);

    return res.status(200).json({
      success: true,
      orderId: orderId,
      message: 'COD Order placed successfully',
    });
  } catch (error) {
    console.error('COD Order creation error:', error);
    return res.status(500).json({
      error: 'Failed to create COD order',
      details: error.message,
    });
  }
}
