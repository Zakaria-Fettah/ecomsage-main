
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, products } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

// Simulate cart items with a default set of products
const initialCartItems = [
  { product: products[0], quantity: 1 },
  { product: products[3], quantity: 2 },
];

interface CartItem {
  product: Product;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const { toast } = useToast();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Apply discount if promo code is valid
  const discount = isPromoValid ? subtotal * 0.1 : 0;
  
  // Fixed shipping cost
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  // Calculate total
  const total = subtotal - discount + shipping;
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const handleRemoveItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };
  
  const handleApplyPromo = () => {
    // Simulate promo code validation
    if (promoCode.toLowerCase() === 'promo10') {
      setIsPromoValid(true);
      toast({
        title: "Code promo appliqué",
        description: "Réduction de 10% appliquée à votre commande",
      });
    } else {
      setIsPromoValid(false);
      toast({
        title: "Code promo invalide",
        description: "Le code promo saisi n'est pas valide",
        variant: "destructive",
      });
    }
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout en cours",
      description: "Redirection vers la page de paiement...",
    });
    
    // Normally would redirect to checkout page
    // For this demo we just reset the cart after 2 seconds
    setTimeout(() => {
      setCartItems([]);
      toast({
        title: "Commande validée",
        description: "Merci pour votre achat !",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuer mes achats
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="sm:w-24 w-full flex-shrink-0">
                      <div className="relative aspect-square">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow space-y-2">
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{item.product.price} €</span>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 border border-border rounded-lg p-6 space-y-6">
                  <h2 className="text-lg font-semibold">Récapitulatif de commande</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction (10%)</span>
                        <span>-{discount.toFixed(2)} €</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span>
                    </div>
                    
                    <div className="border-t border-border pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Code promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleApplyPromo}>
                        Appliquer
                      </Button>
                    </div>
                    
                    {isPromoValid && (
                      <p className="text-xs text-green-600">Code promo PROMO10 appliqué !</p>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payer maintenant
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Livraison gratuite à partir de 50€ d'achat
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">Vous n'avez pas encore ajouté de produits à votre panier</p>
              <Link 
                to="/products" 
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all"
                )}
              >
                Parcourir les produits
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default CartPage;
