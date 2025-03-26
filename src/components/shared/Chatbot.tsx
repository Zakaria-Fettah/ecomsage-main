
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour ! Je suis EcoBot, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Réponses prédéfinies pour simuler l'IA
  const botResponses = [
    "Je peux vous aider à trouver les produits qui correspondent à vos besoins.",
    "Nos derniers smartphones sont disponibles en stock avec livraison gratuite !",
    "Pour un problème technique, je vous invite à consulter notre FAQ ou à contacter notre service client.",
    "Nous acceptons plusieurs méthodes de paiement : carte bancaire, PayPal, et Apple Pay.",
    "Les retours sont gratuits pendant 30 jours après la réception de votre commande."
  ];
  
  // Faire défiler vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simuler la réponse de l'IA avec délai
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Bouton du chatbot */}
      <button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-90" 
            : "bg-primary hover:bg-primary/90 animate-pulse-slow"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
      
      {/* Fenêtre de chat */}
      <div 
        className={cn(
          "absolute bottom-16 right-0 w-72 sm:w-96 rounded-xl overflow-hidden shadow-xl transition-all duration-300 origin-bottom-right glass-card border border-border",
          isOpen 
            ? "scale-100 opacity-100" 
            : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Entête */}
        <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
          <h3 className="font-medium">Assistant EcoSage</h3>
        </div>
        
        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-muted/20">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "chat-bubble animate-fade-in", 
                message.sender === 'user' ? 'user' : 'bot'
              )}
            >
              {message.text}
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-bubble bot flex space-x-1">
              <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-3 border-t border-border flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Écrivez votre message..."
            className="flex-1 py-2 px-3 rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className={cn(
              "ml-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              inputValue.trim() === '' 
                ? "bg-muted/30 text-muted-foreground" 
                : "bg-primary text-primary-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
