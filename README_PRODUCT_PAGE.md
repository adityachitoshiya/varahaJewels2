# Premium Shopify-Style Product Page

A modern, mobile-first single product page built with React, Next.js, and Tailwind CSS.

## 🎯 Features

### ✅ Complete Feature Set
- **Announcement Bar** - Dismissible, persists state in localStorage
- **Sticky Header** - Responsive with search and cart (desktop sticky only)
- **Product Carousel** - Swipeable images with video support, lightbox zoom
- **Product Details** - Price, variants, reviews, collapsible tabs
- **Sticky Mobile Buy Bar** - Always visible on mobile above footer
- **Add to Cart Modal** - Full cart management with localStorage
- **Buy Now** - Direct checkout via API call
- **Reviews Section** - Load more functionality
- **Recommended Products** - Horizontal scroll on mobile, grid on desktop
- **Footer** - Newsletter, links, social icons

### 🎨 Design
- Mobile-first responsive design
- Smooth animations and transitions
- Clean, modern Shopify-inspired UI
- Optimized for touch interactions

### ⚡ Performance
- Lazy-loaded images
- Video loads only on user interaction
- Optimized bundle size
- Fast page loads

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the product page.

The page will automatically redirect to `/product/prod_001`.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── pages/
│   ├── _app.jsx              # Next.js App wrapper
│   ├── _document.jsx         # Next.js Document
│   ├── index.jsx             # Home (redirects to product)
│   ├── product/
│   │   └── [id].jsx          # Dynamic product page
│   └── api/
│       └── create-checkout-session.js  # Mock checkout API
├── components/
│   ├── AnnouncementBar.jsx   # Dismissible announcement
│   ├── Header.jsx            # Sticky header with search/cart
│   ├── ProductCarousel.jsx   # Image/video carousel
│   ├── ProductInfo.jsx       # Product details & variants
│   ├── StickyBuyBar.jsx      # Mobile-only sticky CTA
│   ├── AddToCartModal.jsx    # Cart modal with management
│   ├── ReviewsSection.jsx    # Customer reviews
│   ├── RecommendedProducts.jsx  # Product recommendations
│   └── Footer.jsx            # Footer with newsletter
├── lib/
│   └── productData.js        # Mock product data
└── src/
    └── index.css             # Global styles
```

## 🛒 Cart & Checkout Flow

### Add to Cart
1. User clicks "Add to Cart"
2. Item added to localStorage
3. Cart modal opens showing items
4. User can:
   - Continue Shopping
   - View/Edit Cart
   - Proceed to Checkout

### Buy Now
1. User clicks "Buy Now"
2. Loading state shown
3. POST request to `/api/create-checkout-session`
4. Payload: `{ productId, variantId, quantity }`
5. Response: `{ checkoutUrl: "..." }`
6. Browser redirects to checkout URL
7. Error handling with retry option

## 🎨 Customization

### Product Data
Edit `/lib/productData.js` to change:
- Product title, price, images
- Variants (sizes, colors)
- Reviews and ratings
- Recommended products

### Styling
- All components use Tailwind CSS
- Colors can be customized in component files
- Global styles in `/src/index.css`

### API Integration
Replace the mock API in `/pages/api/create-checkout-session.js` with your actual payment provider (Stripe, Razorpay, etc.)

## 📱 Mobile-First Design

- Horizontal scroll carousels on mobile
- Touch-optimized swipe gestures
- Sticky buy bar only on mobile
- Responsive grid layouts on desktop
- Safe area insets for notched devices

## 🔑 Key Technologies

- **Next.js 14** - React framework with API routes
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Modern icon set
- **localStorage** - Client-side cart persistence

## 📝 Notes

- Video in carousel uses lazy loading (preload="none")
- Images use lazy loading except the first slide
- Cart state syncs with localStorage automatically
- Announcement dismissal persists across sessions
- Desktop header is sticky, mobile is relative

## 🌟 Credits

Built following Shopify product page best practices with modern React patterns.
