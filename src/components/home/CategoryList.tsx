
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';
import { useScrollAnimation } from '@/lib/animations';

const CategoryList = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  
  return (
    <section ref={sectionRef} className="section bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className={`section-title text-center mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Explorer par catégorie
        </h2>
        <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Parcourez notre sélection de produits par catégories et trouvez exactement ce dont vous avez besoin
        </p>
        
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className={`group relative overflow-hidden rounded-xl aspect-square transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {category.productsCount} produits
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
