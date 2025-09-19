import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Globe, 
  Brain, 
  Users, 
  BarChart3, 
  Shield, 
  Database, 
  Zap,
  Languages,
  GraduationCap,
  FileText,
  HeadphonesIcon,
  TrendingUp,
  Lock
} from 'lucide-react';
import heroImage from '@/assets/hero-chatbot.jpg';
import dashboardImage from '@/assets/dashboard-preview.jpg';
import { AuthModal } from '@/components/AuthModal';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ChatbotInterface } from '@/components/ChatbotInterface';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Handle FAQs',
      description: 'Automated responses for fees, scholarships, and timetables',
      color: 'text-primary'
    },
    {
      icon: Languages,
      title: '5+ Languages Support',
      description: 'Hindi, English, Urdu, Telugu, Marathi and more',
      color: 'text-accent-teal'
    },
    {
      icon: Brain,
      title: 'Smart Intent Recognition',
      description: 'Advanced context management and understanding',
      color: 'text-primary-glow'
    },
    {
      icon: Users,
      title: 'Human Fallback',
      description: 'Seamless handover to human support when needed',
      color: 'text-accent-teal'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Daily conversation logs and automated training',
      color: 'text-primary'
    },
    {
      icon: Database,
      title: 'Offline Training',
      description: 'Update datasets and train models offline',
      color: 'text-accent-teal'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Languages Supported', value: '5+', icon: Globe },
    { label: 'Queries Resolved', value: '50,000+', icon: MessageCircle },
    { label: 'Accuracy Rate', value: '95%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-lg text-foreground">Language Agnostic Chatbot</h1>
                <p className="text-xs text-muted-foreground">Government of Rajasthan | DTE</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Button 
                variant="outline" 
                onClick={() => openAuth('signin')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => openAuth('signup')}
                className="btn-hero border-0 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Government of Rajasthan | Smart Education Initiative
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Language Agnostic
                <span className="bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent block">
                  Chatbot
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Smart Multilingual Support for Students. Reduce repetitive queries, provide instant answers in multiple languages, and enhance the learning experience with AI-powered assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="btn-hero border-0 text-white text-lg px-8 py-4">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Try the Chatbot
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-teal/20 blur-3xl"></div>
                <img 
                  src={heroImage} 
                  alt="Language Agnostic Chatbot Interface"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <Badge className="mb-6 bg-accent-teal/10 text-accent-teal border-accent-teal/20">
            Problem & Solution
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Revolutionizing Student Support
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <Card className="card-gradient border-0 p-8">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-xl text-foreground">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Students face repetitive queries about fees, scholarships, and timetables. Language barriers and overwhelmed staff create delays in getting crucial information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 p-8">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  AI-powered multilingual chatbot that provides instant, accurate responses in 5+ languages, reducing staff workload and improving student experience 24/7.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Key Features
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Powerful Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge AI technology to serve students and staff with intelligent, multilingual support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="interactive-card border-0 p-6 group">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary/10 to-accent-teal/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Interface Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-5xl mx-auto text-center fade-in-up">
          <Badge className="mb-6 bg-accent-teal/10 text-accent-teal border-accent-teal/20">
            Try It Now
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Experience the Chatbot
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Test our multilingual chatbot interface. Ask questions about fees, scholarships, or timetables in your preferred language.
          </p>
          
          <ChatbotInterface selectedLanguage={selectedLanguage} />
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Analytics Dashboard
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Data-Driven Insights
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Monitor chatbot performance, track language usage, analyze query patterns, and measure response accuracy with our comprehensive analytics dashboard.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Real-time conversation monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-accent-teal rounded-full"></div>
                  <span className="text-foreground">Language preference analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary-glow rounded-full"></div>
                  <span className="text-foreground">Response accuracy metrics</span>
                </div>
              </div>
            </div>

            <div className="fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/20 to-primary/20 blur-3xl"></div>
                <img 
                  src={dashboardImage} 
                  alt="Analytics Dashboard Preview"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <Badge className="mb-6 bg-green-100 text-green-700 border-green-200">
            Privacy & Security
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Trusted & Secure
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Data Privacy</h3>
              <p className="text-muted-foreground">All student data is encrypted and stored securely following government compliance standards.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Access</h3>
              <p className="text-muted-foreground">Role-based access control ensures only authorized personnel can manage the system.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Audit Trail</h3>
              <p className="text-muted-foreground">Complete conversation logs and analytics for continuous improvement and compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h3 className="font-bold text-xl">Language Agnostic Chatbot</h3>
                <p className="text-sm opacity-80">Smart Education Initiative</p>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <p className="text-lg font-medium mb-2">Government of Rajasthan</p>
              <p className="opacity-80">Directorate of Technical Education (DTE)</p>
              <p className="text-sm opacity-60 mt-4">
                © 2024 Government of Rajasthan. All rights reserved. | Built for Smart Education Theme
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;