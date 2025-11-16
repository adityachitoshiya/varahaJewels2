// API Route: /api/update-order-status
import { updateOrderStatus, getOrderById } from "../../lib/orderStorage";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, status, paymentId } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        error: "Missing required fields",
        received: { orderId, status }
      });
    }

    // Update order status
    const updatedOrder = updateOrderStatus(orderId, status, paymentId);

    console.log(`✅ Order ${orderId} updated to status: ${status}`);

    return res.status(200).json({
      success: true,
      order: updatedOrder
    });

  } catch (error) {
    console.error("❌ Update order error:", error);
    return res.status(500).json({
      error: "Failed to update order status",
      details: error.message
    });
  }
}
