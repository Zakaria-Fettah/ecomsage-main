
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    setIsAddingToCart(true);
    
    // Simulate adding to cart with success message
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Produit ajouté au panier",
        description: `${product.name} a été ajouté à votre panier`,
      });
    }, 600);
  };
  
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Badge Nouveau */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold py-1 px-2 rounded-full">
              Nouveau
            </div>
          )}
          
          {/* Bouton favoris */}
          <button 
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              isHovered 
                ? "bg-white/90 text-primary opacity-100" 
                : "bg-white/70 text-foreground opacity-70"
            )}
            onClick={(e) => {
              e.preventDefault();
              toast({
                title: "Produit ajouté aux favoris",
                description: `${product.name} a été ajouté à votre liste de favoris`,
              });
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
          
          {/* Call-to-action au hover */}
          <div 
            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 0.2 : 0 }}
          />
        </div>
        
        {/* Info produit */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-4 h-4", 
                    i < Math.floor(product.rating) 
                      ? "fill-current text-amber-500" 
                      : "fill-current text-muted/40"
                  )} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>
          
          <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{product.price} €</span>
            
            <button 
              className={cn(
                "flex items-center justify-center rounded-lg transition-all duration-300",
                isHovered 
                  ? "bg-primary text-primary-foreground py-2 px-3" 
                  : "bg-secondary text-secondary-foreground py-2 px-2",
                isAddingToCart && "bg-green-600 text-white"
              )}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? (
                <>
                  <Check className="w-4 h-4" />
                  {isHovered && <span className="ml-2 text-sm">Ajouté</span>}
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {isHovered && <span className="ml-2 text-sm">Acheter</span>}
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
