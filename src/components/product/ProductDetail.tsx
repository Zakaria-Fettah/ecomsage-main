
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, products } from '@/lib/data';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, ChevronDown, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simuler une recherche de produit
    const foundProduct = products.find(p => p.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    // Remonter en haut de la page
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simuler l'ajout au panier avec animation
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Produit ajouté au panier",
        description: product ? `${product.name} a été ajouté à votre panier (Quantité: ${quantity})` : "Produit ajouté au panier",
      });
    }, 1000);
  };
  
  const handleAddToFavorites = () => {
    toast({
      title: "Produit ajouté aux favoris",
      description: product ? `${product.name} a été ajouté à votre liste de favoris` : "Produit ajouté aux favoris",
    });
  };
  
  const handleShare = () => {
    // Normally would open a share dialog or copy to clipboard
    toast({
      title: "Lien copié",
      description: "Le lien du produit a été copié dans votre presse-papiers",
    });
  };
  
  if (!product) {
    return (
      <div className="page-container flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-lg bg-muted h-8 w-56 mb-4"></div>
          <div className="h-4 bg-muted rounded w-28"></div>
        </div>
      </div>
    );
  }
  
  // Images factices pour la galerie
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2940&auto=format&fit=crop"
  ];
  
  return (
    <div className="page-container pt-24">
      <div className="mb-8">
        <Link to="/products" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie de photos */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl aspect-square bg-muted/20">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover animate-fade-in"
            />
            
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full">
                Nouveau
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((img, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative overflow-hidden rounded-lg aspect-square border-2 transition-all",
                  selectedImage === index 
                    ? "border-primary" 
                    : "border-transparent hover:border-muted-foreground/20"
                )}
              >
                <img 
                  src={img} 
                  alt={`${product.name} - vue ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Informations produit */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center mt-2">
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
              <span className="text-sm text-muted-foreground ml-2">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>
          </div>
          
          <div className="text-3xl font-bold">{product.price} €</div>
          
          <p className="text-muted-foreground">
            {product.description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" />
              En stock
            </div>
            <span className="mx-2">•</span>
            <div>Livraison gratuite à partir de 50€</div>
          </div>
          
          <div className="border-t border-border pt-6">
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantité
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-l-lg border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-y border-border text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 rounded-r-lg border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all",
                  isAddingToCart 
                    ? "bg-green-600 text-white" 
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5 animate-fade-in" />
                    Ajouté
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </>
                )}
              </button>
              
              <button 
                className="py-3 px-4 rounded-lg font-medium border border-border hover:bg-muted/50 transition-colors flex items-center justify-center"
                onClick={handleAddToFavorites}
              >
                <Heart className="mr-2 h-5 w-5" />
                Favoris
              </button>
              
              <button 
                className="py-3 px-4 rounded-lg font-medium border border-border hover:bg-muted/50 transition-colors flex items-center justify-center sm:hidden md:flex"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Partager
              </button>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium">Détails du produit</span>
              <ChevronDown className={cn(
                "h-5 w-5 transition-transform",
                isExpanded ? "transform rotate-180" : ""
              )} />
            </button>
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300",
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="py-4 space-y-4 text-muted-foreground">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                  sit amet blandit leo lobortis eget.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Caractéristique 1</li>
                  <li>Caractéristique 2</li>
                  <li>Caractéristique 3</li>
                  <li>Caractéristique 4</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
