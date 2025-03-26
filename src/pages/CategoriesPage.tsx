
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { categories, products } from '@/lib/data';
import { Link } from 'react-router-dom';
import Chatbot from '@/components/shared/Chatbot';
import { useScrollAnimation } from '@/lib/animations';

const CategoriesPage = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div ref={sectionRef} className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className={`text-3xl font-bold mb-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Catégories
          </h1>
          <p className={`text-muted-foreground mb-12 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Parcourez notre sélection de produits par catégories et trouvez exactement ce dont vous avez besoin
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              // Count products in this category
              const productCount = products.filter(p => p.category === category.name).length;
              
              return (
                <Link 
                  key={category.id}
                  to={`/products?category=${category.name}`}
                  className={`group relative overflow-hidden rounded-xl aspect-[3/2] transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white text-2xl font-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {productCount} produits
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default CategoriesPage;
