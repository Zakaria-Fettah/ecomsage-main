
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { useScrollAnimation } from '@/lib/animations';

const AboutPage = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div ref={sectionRef} className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className={`max-w-3xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h1 className="text-3xl font-bold mb-6">À propos de EcomSage</h1>
            
            <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
              <p>
                Bienvenue chez EcomSage, votre destination pour des produits technologiques de haute qualité. 
                Fondée en 2023, notre entreprise s'est engagée à vous proposer les meilleures innovations technologiques, 
                tout en maintenant un service client exceptionnel.
              </p>
              
              <h2>Notre Mission</h2>
              <p>
                Notre mission est simple : rendre la technologie accessible à tous. Nous nous efforçons de sélectionner 
                des produits qui combinent qualité, innovation et prix abordable pour que chacun puisse profiter des 
                dernières avancées technologiques.
              </p>
              
              <h2>Nos Valeurs</h2>
              <ul>
                <li><strong>Qualité</strong> - Nous ne proposons que des produits que nous utiliserions nous-mêmes.</li>
                <li><strong>Innovation</strong> - Nous recherchons constamment les dernières technologies pour vous offrir le meilleur.</li>
                <li><strong>Service client</strong> - Votre satisfaction est notre priorité absolue.</li>
                <li><strong>Éthique</strong> - Nous nous engageons à travailler avec des fournisseurs responsables.</li>
              </ul>
              
              <h2>Notre Équipe</h2>
              <p>
                Notre équipe est composée de passionnés de technologie qui partagent la même vision : 
                créer une expérience d'achat en ligne exceptionnelle. De nos experts en produits à notre 
                équipe de support client, chaque membre contribue à faire de votre expérience chez EcomSage 
                un moment agréable et satisfaisant.
              </p>
              
              <h2>Notre Engagement</h2>
              <p>
                Chez EcomSage, nous nous engageons à:
              </p>
              <ul>
                <li>Proposer des produits de qualité supérieure</li>
                <li>Offrir un service client réactif et compétent</li>
                <li>Garantir la sécurité de vos données personnelles</li>
                <li>Assurer des livraisons rapides et fiables</li>
                <li>Améliorer constamment notre offre et nos services</li>
              </ul>
              
              <p>
                Merci de faire partie de l'aventure EcomSage. Nous sommes impatients de vous accompagner 
                dans votre parcours technologique.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default AboutPage;
