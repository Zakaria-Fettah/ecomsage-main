
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Demo count
  const location = useLocation();
  const { toast } = useToast();

  // Gérer le défilement pour le changement d'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = () => {
    toast({
      title: "Recherche",
      description: "La fonction de recherche sera bientôt disponible",
    });
  };

  const handleAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Mon compte",
      description: "La page de compte sera bientôt disponible",
    });
  };

  return (
    <nav 
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight transition-colors hover:text-primary"
          >
            EcomSage
          </Link>

          {/* Navigation sur desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/products" className="nav-link">Produits</Link>
            <Link to="/categories" className="nav-link">Catégories</Link>
            <Link to="/about" className="nav-link">À propos</Link>
          </div>

          {/* Icônes d'action */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="icon-button" onClick={handleSearch}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/favorites" className="icon-button" onClick={handleAccount}>
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="icon-button relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <Link to="/account" className="icon-button" onClick={handleAccount}>
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Hamburger pour mobile */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <div 
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0' 
          )}
        >
          <div className="flex flex-col space-y-4">
            <Link to="/" className="mobile-nav-link">Accueil</Link>
            <Link to="/products" className="mobile-nav-link">Produits</Link>
            <Link to="/categories" className="mobile-nav-link">Catégories</Link>
            <Link to="/about" className="mobile-nav-link">À propos</Link>
          </div>
          <div className="flex items-center space-x-4 pt-4 border-t border-border mt-4">
            <button className="icon-button" onClick={handleSearch}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/favorites" className="icon-button" onClick={handleAccount}>
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="icon-button relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <Link to="/account" className="icon-button" onClick={handleAccount}>
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
