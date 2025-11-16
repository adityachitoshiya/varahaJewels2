// API Route: /api/create-checkout-session
import Razorpay from "razorpay";
import { saveOrder } from "../../lib/orderStorage";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId, variantId, quantity, amount, name, email, contact, address, couponCode, discount } = req.body;

    console.log("🔹 Received:", req.body);

    if (!productId || !variantId || !quantity || !amount) {
      return res.status(400).json({
        error: "Missing required fields",
        received: { productId, variantId, quantity, amount }
      });
    }

    // Environment check
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        error: "Razorpay keys missing on server"
      });
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return res.status(500).json({
        error: "NEXT_PUBLIC_SITE_URL missing"
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    
    // Calculate discount amount
    const discountPercent = discount || 0;
    let originalAmount, discountAmount;
    
    if (couponCode === 'TESTADI') {
      // TESTADI makes final price ₹1
      originalAmount = amount > 1 ? amount : 2499; // If amount is already ₹1, use a default original price
      discountAmount = originalAmount - 1;
    } else {
      originalAmount = discountPercent > 0 ? Math.round(amount / (1 - discountPercent / 100)) : amount;
      discountAmount = originalAmount - amount;
    }

    // Save order to database BEFORE creating payment link
    try {
      const savedOrder = saveOrder({
        orderId,
        amount,
        originalAmount,
        discountAmount,
        name,
        email,
        contact,
        address,
        productId,
        variantId,
        productName: `Product ${productId}`,
        quantity,
        couponCode,
        discount: discountPercent,
        status: 'pending',
        notes: {
          variantId,
          address: address || "Not provided",
        }
      });

      console.log("✅ Order saved:", savedOrder.id);
    } catch (saveError) {
      console.error("❌ Failed to save order:", saveError);
      // Continue anyway - don't block payment
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Amount must be number
    const amountPaise = Number(amount) * 100;

    if (isNaN(amountPaise)) {
      return res.status(400).json({
        error: "Amount is invalid",
        receivedAmount: amount
      });
    }

    const paymentLink = await razorpay.paymentLink.create({
      amount: amountPaise,
      currency: "INR",
      description: `Order for ${productId} (Variant: ${variantId}) - Qty: ${quantity}`,
      customer: {
        name: name || "Customer",
        email: email || "customer@example.com",
        contact: contact || "9999999999",
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?orderId=${orderId}&amount=${amount}&productName=Varaha Jewels Product&quantity=${quantity}&email=${email}&name=${name}`,
      callback_method: "get",
      notes: {
        productId,
        variantId,
        quantity,
        address: address || "Not provided",
        couponCode: couponCode || "None",
        discount: discount || 0,
      },
    });

    return res.status(200).json({
      success: true,
      checkoutUrl: paymentLink.short_url,
      sessionId: paymentLink.id,
      orderId: orderId, // Include order ID for test mode
    });

  } catch (error) {
    console.error("❌ Checkout error:", error);
    return res.status(500).json({
      error: "Failed to create Razorpay checkout session",
      details: error.message
    });
  }
}
