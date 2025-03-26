
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '../product/ProductCard';
import { useScrollAnimation } from '@/lib/animations';

const FeaturedProducts = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  const featuredProducts = products.filter(product => product.isFeatured);
  
  return (
    <section ref={sectionRef} className="section">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`section-title transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Produits à la une
          </h2>
          <Link 
            to="/products" 
            className={`flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
          >
            Voir tous les produits
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
