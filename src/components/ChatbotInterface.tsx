import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  HeadphonesIcon, 
  MessageCircle,
  Sparkles,
  Clock,
  CheckCircle
} from 'lucide-react';

interface ChatbotInterfaceProps {
  selectedLanguage: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

const sampleQuestions = {
  English: [
    "What are the fee structures for different courses?",
    "How can I apply for scholarships?",
    "Show me today's class timetable",
    "What documents are required for admission?"
  ],
  Hindi: [
    "विभिन्न कोर्सों की फीस संरचना क्या है?",
    "मैं छात्रवृत्ति के लिए कैसे आवेदन कर सकता हूं?",
    "आज का कक्षा समय सारिणी दिखाएं",
    "प्रवेश के लिए कौन से दस्तावेज आवश्यक हैं?"
  ],
  Urdu: [
    "مختلف کورسز کی فیس کی ساخت کیا ہے؟",
    "میں اسکالرشپ کے لیے کیسے اپلائی کر سکتا ہوں؟",
    "آج کا کلاس ٹائم ٹیبل دکھائیں",
    "داخلے کے لیے کون سے دستاویز درکار ہیں؟"
  ],
  Telugu: [
    "వివిధ కోర్సుల ఫీజు నిర్మాణం ఎలా ఉంది?",
    "స్కాలర్‌షిప్‌లకు ఎలా దరఖాస్తు చేయాలి?",
    "నేటి క్లాస్ టైమ్‌టేబుల్ చూపించండి",
    "ప్రవేశానికి ఏ పత్రాలు అవసరం?"
  ],
  Marathi: [
    "विविध कोर्सच्या फी संरचना काय आहेत?",
    "शिष्यवृत्तीसाठी अर्ज कसा करावा?",
    "आजचे वर्गाचे वेळापत्रक दाखवा",
    "प्रवेशासाठी कोणती कागदपत्रे आवश्यक आहेत?"
  ]
};

const botResponses = {
  English: {
    greeting: "Hello! I'm your multilingual assistant for Rajasthan DTE. How can I help you today?",
    fee: "Here are the current fee structures: Engineering: ₹75,000/year, Diploma: ₹45,000/year, Management: ₹85,000/year. Fee payment can be done online or at designated centers.",
    scholarship: "Scholarships available: Merit-based (70%+ marks), Need-based (family income <₹2L), SC/ST quota (50% fee waiver). Application deadline: March 31st.",
    timetable: "Today's Schedule: 9:00 AM - Mathematics, 11:00 AM - Physics, 2:00 PM - Chemistry Lab, 4:00 PM - English. Check your student portal for room details.",
    documents: "Required documents: 12th marksheet, Transfer certificate, Character certificate, Category certificate (if applicable), Income certificate, Passport size photos (4), Aadhar card copy."
  },
  Hindi: {
    greeting: "नमस्ते! मैं राजस्थान DTE के लिए आपका बहुभाषी सहायक हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    fee: "वर्तमान फीस संरचना: इंजीनियरिंग: ₹75,000/वर्ष, डिप्लोमा: ₹45,000/वर्ष, प्रबंधन: ₹85,000/वर्ष। फीस भुगतान ऑनलाइन या निर्दिष्ट केंद्रों पर किया जा सकता है।",
    scholarship: "उपलब्ध छात्रवृत्तियां: मेधा आधारित (70%+ अंक), आवश्यकता आधारित (पारिवारिक आय <₹2L), SC/ST कोटा (50% फीस माफी)। आवेदन की अंतिम तिथि: 31 मार्च।",
    timetable: "आज का कार्यक्रम: 9:00 AM - गणित, 11:00 AM - भौतिकी, 2:00 PM - रसायन प्रयोगशाला, 4:00 PM - अंग्रेजी। कमरे की जानकारी के लिए छात्र पोर्टल देखें।",
    documents: "आवश्यक दस्तावेज: 12वीं की मार्कशीट, स्थानांतरण प्रमाणपत्र, चरित्र प्रमाणपत्र, श्रेणी प्रमाणपत्र (यदि लागू हो), आय प्रमाणपत्र, पासपोर्ट साइज फोटो (4), आधार कार्ड की कॉपी।"
  }
};

export const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with greeting message when language changes
    const greeting = botResponses[selectedLanguage as keyof typeof botResponses]?.greeting 
      || botResponses.English.greeting;
    
    setMessages([{
      id: '1',
      text: greeting,
      sender: 'bot',
      timestamp: new Date(),
      language: selectedLanguage
    }]);
  }, [selectedLanguage]);

  const generateBotResponse = (userMessage: string): string => {
    const responses = botResponses[selectedLanguage as keyof typeof botResponses] || botResponses.English;
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fee') || lowerMessage.includes('फीस') || lowerMessage.includes('فیس')) {
      return responses.fee;
    }
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('छात्रवृत्ति') || lowerMessage.includes('اسکالرشپ')) {
      return responses.scholarship;
    }
    if (lowerMessage.includes('timetable') || lowerMessage.includes('समय') || lowerMessage.includes('ٹائم ٹیبل')) {
      return responses.timetable;
    }
    if (lowerMessage.includes('document') || lowerMessage.includes('दस्तावेज') || lowerMessage.includes('دستاویز')) {
      return responses.documents;
    }
    
    return `I understand you're asking about "${userMessage}". Let me connect you with the right information or a human agent who can help you better. You can also try asking about fees, scholarships, timetables, or required documents.`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentSampleQuestions = sampleQuestions[selectedLanguage as keyof typeof sampleQuestions] 
    || sampleQuestions.English;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sample Questions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Try asking these questions:
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {currentSampleQuestions.slice(0, 4).map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-left h-auto p-4 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              onClick={() => handleSampleQuestion(question)}
            >
              <div className="flex items-start space-x-3 w-full">
                <MessageCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">{question}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Chatbot Interface */}
      <Card className="card-gradient border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent-teal text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white">DTE Assistant</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80">Online • Multilingual Support</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              Human Support
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background/50 to-white/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`
                  h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-accent-teal text-white'
                  }
                `}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`
                  max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
                  ${message.sender === 'user'
                    ? 'bg-primary text-white ml-auto'
                    : 'bg-white border border-border/50 text-foreground'
                  }
                `}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`
                    text-xs mt-2 flex items-center
                    ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}
                  `}>
                    <Clock className="h-3 w-3 mr-1" />
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                    {message.sender === 'user' && (
                      <CheckCircle className="h-3 w-3 ml-2" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-accent-teal rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-border/50 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-white p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask about fees, scholarships, timetables... (${selectedLanguage})`}
                  className="pr-12 h-12 border-border/50 focus:border-primary"
                />
                <Badge className="absolute right-3 top-3 bg-primary/10 text-primary text-xs px-2 py-1">
                  {selectedLanguage}
                </Badge>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="btn-hero border-0 text-white h-12 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};