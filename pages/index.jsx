import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeroSection from '../components/homepage/HeroSection';
import FeaturedCollections from '../components/homepage/FeaturedCollections';
import ProductSpotlight from '../components/homepage/ProductSpotlight';
import HeritageSection from '../components/homepage/HeritageSection';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import PremiumLoader from '../components/PremiumLoader';
import LaunchCountdown from '../components/LaunchCountdown';
import AddToCartModal from '../components/AddToCartModal';
import BackToTop from '../components/BackToTop';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showFullPageCountdown, setShowFullPageCountdown] = useState(true);
  const [userSkipped, setUserSkipped] = useState(false);
  
  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSkip = () => {
    setShowFullPageCountdown(false);
    setUserSkipped(true);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <>
      <Head>
        <title>Varaha Jewels - Where Heritage Meets Royalty</title>
        <meta name="description" content="Discover timeless elegance with Varaha Jewels - Premium heritage-inspired jewelry crafted with tradition and artistry. Where heritage meets royalty." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/varaha-assets/og.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/varaha-assets/og.jpg" />
        <link rel="shortcut icon" href="/varaha-assets/og.jpg" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Varaha Jewels - Where Heritage Meets Royalty" />
        <meta property="og:description" content="Discover timeless elegance with Varaha Jewels - Premium heritage-inspired jewelry crafted with tradition and artistry." />
        <meta property="og:image" content="/varaha-assets/og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Varaha Jewels - Where Heritage Meets Royalty" />
        <meta name="twitter:description" content="Discover timeless elegance with Varaha Jewels - Premium heritage-inspired jewelry." />
        <meta name="twitter:image" content="/varaha-assets/og.jpg" />
      </Head>

      <PremiumLoader onComplete={() => setIsLoading(false)} />

      {!isLoading && showFullPageCountdown && (
        <LaunchCountdown onSkip={handleSkip} />
      )}

      {!isLoading && !showFullPageCountdown && (
        <>
          <AnnouncementBar showCountdown={userSkipped} />
          <Header 
            cartCount={cartCount}
            onCartClick={() => setIsCartModalOpen(true)}
          />

          <main className="bg-warm-sand">
            <HeroSection />
            <FeaturedCollections />
            <ProductSpotlight />
            <HeritageSection />
            <TestimonialsSection />
          </main>

          <Footer />

          {/* Back to Top Button */}
          <BackToTop />

          {/* Cart Modal */}
          <AddToCartModal
            isOpen={isCartModalOpen}
            onClose={() => setIsCartModalOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onViewCart={() => {
              setIsCartModalOpen(false);
            }}
            onCheckout={() => {
              setIsCartModalOpen(false);
              // Navigate to checkout with cart items
              window.location.href = '/checkout?fromCart=true';
            }}
            onContinueShopping={() => {
              setIsCartModalOpen(false);
            }}
          />
        </>
      )}
    </>
  );
}
