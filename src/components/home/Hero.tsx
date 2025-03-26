
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/lib/animations';

const Hero = () => {
  const [heroRef, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Arrière-plan avec flou */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=2940&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: 'scale(1.05)'
        }}
      />
      
      {/* Contenu superposé */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-xl">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Technologie de pointe
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            L'innovation au service de votre quotidien
          </h1>
          
          <p className={`text-lg md:text-xl text-muted-foreground mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Découvrez notre sélection de produits innovants qui transformeront votre expérience technologique. Qualité, design et performance.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/products"
              className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all"
            >
              Explorer les produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/categories"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all"
            >
              Voir les catégories
            </Link>
          </div>
        </div>
      </div>
      
      {/* Élément décoratif */}
      <div className="absolute bottom-0 right-0 w-1/3 h-24 bg-gradient-to-t from-primary/20 to-transparent rounded-tl-full" />
    </div>
  );
};

export default Hero;
