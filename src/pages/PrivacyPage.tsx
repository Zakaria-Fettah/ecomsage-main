
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/lib/animations';
import Chatbot from '@/components/shared/Chatbot';

const PrivacyPage = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div ref={sectionRef} className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className={`text-3xl font-bold mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Politique de Confidentialité
          </h1>
          
          <div className={`prose prose-gray dark:prose-invert max-w-none transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="lead text-muted-foreground">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
            
            <h2>Introduction</h2>
            <p>
              Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. 
              Cette politique de confidentialité vous informera sur la façon dont nous traitons vos données personnelles 
              lorsque vous visitez notre site web et vous informera de vos droits en matière de confidentialité et de la 
              manière dont la loi vous protège.
            </p>
            
            <h2>Les données que nous collectons</h2>
            <p>
              Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, notamment:
            </p>
            <ul>
              <li>Données d'identité: prénom, nom, nom d'utilisateur ou identifiant similaire</li>
              <li>Données de contact: adresse email, adresse postale, numéro de téléphone</li>
              <li>Données de transaction: détails des produits et services que vous avez achetés</li>
              <li>Données techniques: adresse IP, informations de connexion, type et version du navigateur</li>
              <li>Données d'utilisation: informations sur la façon dont vous utilisez notre site web et nos services</li>
            </ul>
            
            <h2>Comment nous utilisons vos données</h2>
            <p>
              Nous utiliserons vos données personnelles uniquement lorsque la loi nous le permet. Les situations les plus courantes dans lesquelles nous traiterons vos données personnelles sont les suivantes:
            </p>
            <ul>
              <li>Pour exécuter notre contrat avec vous</li>
              <li>Lorsque cela est nécessaire pour nos intérêts légitimes et que vos intérêts ne prévalent pas</li>
              <li>Lorsque nous devons nous conformer à une obligation légale</li>
            </ul>
            
            <h2>Conservation des données</h2>
            <p>
              Nous ne conserverons vos données personnelles que le temps nécessaire pour atteindre les objectifs pour lesquels nous les avons collectées, y compris pour satisfaire aux exigences légales, comptables ou de déclaration.
            </p>
            
            <h2>Vos droits légaux</h2>
            <p>
              Dans certaines circonstances, vous avez des droits en vertu des lois sur la protection des données concernant vos données personnelles, notamment:
            </p>
            <ul>
              <li>Demander l'accès à vos données personnelles</li>
              <li>Demander la correction de vos données personnelles</li>
              <li>Demander l'effacement de vos données personnelles</li>
              <li>S'opposer au traitement de vos données personnelles</li>
              <li>Demander la limitation du traitement de vos données personnelles</li>
              <li>Demander le transfert de vos données personnelles</li>
              <li>Droit de retirer votre consentement</li>
            </ul>
            
            <h2>Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de confidentialité, 
              veuillez nous contacter à l'adresse suivante: privacy@example.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default PrivacyPage;
