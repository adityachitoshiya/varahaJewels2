// API Route: /api/get-orders
import { getOrders, getOrdersByEmail, getOrderById } from "../../lib/orderStorage";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, orderId } = req.query;

    let orders;

    if (orderId) {
      // Get specific order by ID
      const order = getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      orders = [order];
    } else if (email) {
      // Get orders by email
      orders = getOrdersByEmail(email);
    } else {
      // Get all orders (for admin)
      orders = getOrders();
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("❌ Get orders error:", error);
    return res.status(500).json({
      error: "Failed to fetch orders",
      details: error.message
    });
  }
}
