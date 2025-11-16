# 🎯 Quick Start Guide - Shopify Product Page

## 🚀 Running the Application

```bash
# Development mode
npm run dev
# Opens at http://localhost:3000

# Production build
npm run build
npm start
```

## 📍 Access the Product Page

The app automatically redirects from home to:
**http://localhost:3000/product/prod_001**

## 🎨 Component Overview

### 1. **AnnouncementBar**
- Location: Top of page
- Features: Dismissible, localStorage persistence
- Code: `components/AnnouncementBar.jsx`

### 2. **Header**
- Sticky on desktop only
- Search functionality (expandable on mobile)
- Cart icon with item count
- Mobile hamburger menu

### 3. **ProductCarousel**
- Mobile swipe gestures
- Video lazy loading (tap to play)
- Lightbox zoom for images
- Thumbnail navigation
- Keyboard support (arrow keys, ESC)

### 4. **ProductInfo**
- Dynamic pricing with savings badge
- Variant selector
- Stock status indicator
- Key features list
- Collapsible tabs (Details, Shipping)
- Quantity selector (desktop only)

### 5. **StickyBuyBar** (Mobile Only)
- Fixed bottom position
- Add to Cart + Buy Now buttons
- Shows above footer
- Safe area insets for notched devices

### 6. **AddToCartModal**
- Slides in from right
- Full cart management (add, remove, update quantity)
- Subtotal calculation
- Continue Shopping / Checkout options
- Focus trap & ESC to close

### 7. **ReviewsSection**
- Star ratings
- Load more functionality
- Clean review cards

### 8. **RecommendedProducts**
- Horizontal scroll on mobile
- Grid layout on desktop
- Quick add functionality

### 9. **Footer**
- Newsletter subscription
- Multi-column links
- Social media icons

## 🛒 Key Functionalities

### Add to Cart Flow
1. User clicks "Add to Cart"
2. Item saved to localStorage
3. Cart modal opens automatically
4. Shows: Continue Shopping | Proceed to Checkout

### Buy Now Flow
1. User clicks "Buy Now"
2. Loading overlay appears
3. POST to `/api/create-checkout-session`
4. Receives `checkoutUrl`
5. Redirects to checkout
6. Error handling with retry

### Cart Persistence
- Cart stored in `localStorage` as JSON
- Syncs automatically on changes
- Persists across page refreshes

## 🎯 Testing Checklist

### Mobile (< 1024px)
- ✅ Announcement bar dismissible
- ✅ Search expands on tap
- ✅ Hamburger menu works
- ✅ Carousel swipes left/right
- ✅ Video tap to play
- ✅ Sticky buy bar appears at bottom
- ✅ Cart modal slides from right
- ✅ Recommended products scroll horizontally

### Desktop (≥ 1024px)
- ✅ Header is sticky on scroll
- ✅ Search always visible
- ✅ Horizontal nav links shown
- ✅ Quantity selector visible
- ✅ Add to Cart + Buy Now buttons inline
- ✅ NO sticky buy bar
- ✅ Recommended products in grid

### Features
- ✅ Lightbox zoom works
- ✅ Video only loads on tap
- ✅ Cart count updates
- ✅ localStorage persists cart
- ✅ Checkout API call works
- ✅ Error handling shows toast

## 📝 Customization Quick Guide

### Change Product Data
**File:** `lib/productData.js`

```javascript
export const PRODUCT_DATA = {
  id: "prod_001",
  title: "Your Product",
  price: 2499,
  // ... modify as needed
}
```

### Change Colors
**Primary Color (Indigo):** Search for `indigo-600` and replace
**Dark Accent:** Search for `gray-900` and replace

### Add Real Checkout
**File:** `pages/api/create-checkout-session.js`

Replace mock logic with:
```javascript
// Stripe example
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: priceId, quantity }],
  mode: 'payment',
  success_url: `${YOUR_DOMAIN}/success`,
  cancel_url: `${YOUR_DOMAIN}/cancel`,
});
return res.json({ checkoutUrl: session.url });
```

## 🐛 Common Issues

### Issue: Module not found
**Fix:** `npm install --legacy-peer-deps`

### Issue: Tailwind not working
**Fix:** Ensure `@import "tailwindcss";` is in `src/index.css`

### Issue: Images not loading
**Fix:** Add domains to `next.config.js` images section

### Issue: Video not playing
**Fix:** Ensure video URL is accessible and CORS-enabled

## 📱 Mobile Testing

Test on actual device or Chrome DevTools:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone/Android device
4. Test touch interactions

## 🎉 You're All Set!

Your premium Shopify-style product page is ready to go!

- **Development:** http://localhost:3000
- **Product Page:** http://localhost:3000/product/prod_001
- **API Endpoint:** http://localhost:3000/api/create-checkout-session

For detailed documentation, see `README_PRODUCT_PAGE.md`
