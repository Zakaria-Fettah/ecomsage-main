
import { useEffect, useState } from 'react';

// Hook pour les animations d'apparition au scroll
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      {
        threshold
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return [setRef, isVisible] as const;
};

// Animation de transition entre les pages
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
};

// Animation pour les éléments qui apparaissent en séquence
export const staggerChildren = (delay = 0.05) => ({
  container: {
    initial: { opacity: 1 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: delay,
        delayChildren: 0.1 
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }
  }
});

// Animation pour le hover des produits
export const productHoverAnimation = {
  whileHover: { 
    y: -5,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
  }
};
