import { Award, Heart, Sparkles, Users } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export default function HeritageSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-28 bg-warm-sand overflow-hidden">
      {/* Decorative Elements - very subtle */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-10 left-10 w-72 h-72 border border-copper/20 rounded-full animate-floatSlow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-copper/20 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div
            ref={ref}
            className={`space-y-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div>
              <div className="w-16 h-px bg-copper mb-6"></div>
              <h2 className="font-royal text-5xl md:text-6xl font-bold text-heritage mb-8 tracking-tight leading-tight">
                A Legacy of Excellence
              </h2>
              <div className="w-32 h-px bg-copper/50 mb-10"></div>
            </div>

            <p className="font-playfair text-xl text-heritage/80 leading-relaxed font-light">
              For generations, Varaha Jewels has been synonymous with unparalleled craftsmanship 
              and timeless beauty. Our artisans, trained in ancient techniques passed down through 
              centuries, create each piece with devotion and precision.
            </p>

            <p className="font-playfair text-xl text-heritage/80 leading-relaxed font-light">
              Inspired by temple architecture, royal heritage, and traditional motifs, every creation 
              tells a story of India's rich cultural tapestry. We blend the sacred art of jewelry-making 
              with contemporary elegance, ensuring each piece is both a treasured heirloom and a modern statement.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-10">
              <div className="p-8 bg-white border border-copper/30 rounded-sm hover:border-copper hover:shadow-md transition-all duration-500">
                <Award className="text-copper mb-4 animate-float" size={36} />
                <p className="font-royal text-4xl font-bold text-copper mb-3">50+</p>
                <p className="font-sans text-heritage/80 text-lg">Years of Heritage</p>
              </div>
              <div className="p-8 bg-white border border-copper/30 rounded-sm hover:border-copper hover:shadow-md transition-all duration-500">
                <Users className="text-copper mb-4 animate-float" style={{ animationDelay: '1s' }} size={36} />
                <p className="font-royal text-4xl font-bold text-copper mb-3">100+</p>
                <p className="font-sans text-heritage/80 text-lg">Master Artisans</p>
              </div>
              <div className="p-8 bg-white border border-copper/30 rounded-sm hover:border-copper hover:shadow-md transition-all duration-500">
                <Sparkles className="text-copper mb-4 animate-float" style={{ animationDelay: '2s' }} size={36} />
                <p className="font-royal text-4xl font-bold text-copper mb-3">10K+</p>
                <p className="font-sans text-heritage/80 text-lg">Unique Designs</p>
              </div>
              <div className="p-8 bg-white border border-copper/30 rounded-sm hover:border-copper hover:shadow-md transition-all duration-500">
                <Heart className="text-copper mb-4 animate-float" style={{ animationDelay: '3s' }} size={36} />
                <p className="font-royal text-4xl font-bold text-copper mb-3">50K+</p>
                <p className="font-sans text-heritage/80 text-lg">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="h-72 rounded-sm overflow-hidden border border-copper/30 shadow-md hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/varaha-assets/heroimage.avif"
                    alt="Traditional craftsmanship"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/varaha-assets/og.jpg';
                    }}
                  />
                </div>
                <div className="h-52 rounded-sm overflow-hidden border border-copper/30 shadow-md hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/varaha-assets/Jimage2.avif"
                    alt="Temple architecture"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/varaha-assets/og.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="space-y-5 pt-16">
                <div className="h-52 rounded-sm overflow-hidden border border-copper/30 shadow-md hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/varaha-assets/Jimage3.webp"
                    alt="Artisan at work"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/varaha-assets/og.jpg';
                    }}
                  />
                </div>
                <div className="h-72 rounded-sm overflow-hidden border border-copper/30 shadow-md hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/varaha-assets/herosection2.jpg"
                    alt="Heritage jewelry"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/varaha-assets/og.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative Border - very subtle */}
            <div className="absolute -inset-6 border border-copper/15 rounded-sm -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
