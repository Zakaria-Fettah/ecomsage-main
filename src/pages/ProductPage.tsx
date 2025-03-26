
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetail from '@/components/product/ProductDetail';
import Chatbot from '@/components/shared/Chatbot';

const ProductPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductDetail />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ProductPage;
