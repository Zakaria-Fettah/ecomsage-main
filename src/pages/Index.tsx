
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryList from '@/components/home/CategoryList';
import Chatbot from '@/components/shared/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategoryList />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
