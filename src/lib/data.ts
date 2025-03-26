
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  productsCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    description: "Notre smartphone haut de gamme avec une batterie longue durée, un écran OLED et un appareil photo professionnel.",
    price: 999,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2942&auto=format&fit=crop",
    rating: 4.8,
    reviews: 245,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Laptop Ultra",
    description: "Ordinateur portable fin et léger avec processeur puissant et écran haute résolution.",
    price: 1499,
    category: "Ordinateurs",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop",
    rating: 4.7,
    reviews: 187,
    isFeatured: true
  },
  {
    id: 3,
    name: "Montre Connectée Elite",
    description: "Montre intelligente avec suivi fitness, notifications et autonomie de 7 jours.",
    price: 299,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2944&auto=format&fit=crop",
    rating: 4.5,
    reviews: 142,
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    name: "Écouteurs Sans Fil",
    description: "Écouteurs true wireless avec réduction de bruit active et qualité sonore exceptionnelle.",
    price: 199,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2940&auto=format&fit=crop",
    rating: 4.6,
    reviews: 213,
    isFeatured: true
  },
  {
    id: 5,
    name: "Tablette Design",
    description: "Tablette fine avec écran Retina et puissantes capacités multitâches.",
    price: 799,
    category: "Tablettes",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2945&auto=format&fit=crop",
    rating: 4.6,
    reviews: 98,
    isNew: true
  },
  {
    id: 6,
    name: "Enceinte Bluetooth",
    description: "Enceinte portable avec son immersif et résistance à l'eau.",
    price: 129,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2938&auto=format&fit=crop",
    rating: 4.4,
    reviews: 76
  },
  {
    id: 7,
    name: "Appareil Photo Mirrorless",
    description: "Appareil photo professionnel avec capteur haute résolution et vidéo 4K.",
    price: 1299,
    category: "Photo",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2940&auto=format&fit=crop",
    rating: 4.9,
    reviews: 65,
    isFeatured: true
  },
  {
    id: 8,
    name: "Clavier Mécanique",
    description: "Clavier gaming avec switches mécaniques et rétroéclairage RGB personnalisable.",
    price: 149,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2940&auto=format&fit=crop",
    rating: 4.3,
    reviews: 54
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2942&auto=format&fit=crop",
    productsCount: 15
  },
  {
    id: 2,
    name: "Ordinateurs",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop",
    productsCount: 12
  },
  {
    id: 3,
    name: "Audio",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2940&auto=format&fit=crop",
    productsCount: 18
  },
  {
    id: 4,
    name: "Accessoires",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2944&auto=format&fit=crop",
    productsCount: 24
  },
  {
    id: 5,
    name: "Photo",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2940&auto=format&fit=crop",
    productsCount: 9
  },
  {
    id: 6,
    name: "Tablettes",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2945&auto=format&fit=crop",
    productsCount: 7
  }
];
