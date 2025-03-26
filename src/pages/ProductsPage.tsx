
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Chatbot from '@/components/shared/Chatbot';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default to newest
    return b.id - a.id;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tous les produits</h1>
            <button 
              className="md:hidden flex items-center gap-2 py-2 px-4 border border-border rounded-lg"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filtres
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters - Left sidebar on desktop, dropdown on mobile */}
            <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
              <div className="sticky top-24 space-y-6 bg-background p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtres
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="search" className="block text-sm mb-2">Recherche</label>
                      <Input
                        id="search"
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm mb-2">Catégorie</label>
                      <div className="relative">
                        <select
                          id="category"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Toutes les catégories</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="sort" className="block text-sm mb-2">Trier par</label>
                      <div className="relative">
                        <select
                          id="sort"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="newest">Plus récents</option>
                          <option value="price-low">Prix: croissant</option>
                          <option value="price-high">Prix: décroissant</option>
                          <option value="rating">Avis clients</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="md:col-span-3">
              {sortedProducts.length > 0 ? (
                <>
                  <div className="product-grid">
                    {sortedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">Aucun produit ne correspond à votre recherche.</p>
                  <button 
                    className="text-primary hover:underline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ProductsPage;
