import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../lib/productData';

export default function StickyBuyBar({ variant, onAddToCart, onBuyNow }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30 p-4 safe-area-inset-bottom">
      <div className="flex items-center gap-3">
        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(variant, 1)}
          disabled={!variant.inStock}
          className="flex flex-col items-center justify-center p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
          aria-label="Add to cart"
        >
          <ShoppingCart size={24} className="text-gray-700" />
          <span className="text-xs mt-1 text-gray-600">Add</span>
        </button>

        {/* Buy Now Button */}
        <button
          onClick={() => onBuyNow(variant, 1)}
          disabled={!variant.inStock}
          className="flex-1 px-6 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {variant.inStock ? `Buy Now - ${formatCurrency(variant.price)}` : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
