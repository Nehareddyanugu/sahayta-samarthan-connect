import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const supportedLanguages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🏴󠁩󠁮󠁴󠁧󠁿' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🏴󠁩󠁮󠁭󠁨󠁿' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const currentLanguage = supportedLanguages.find(lang => lang.name === selectedLanguage) 
    || supportedLanguages[0];

  return (
    <div className="flex items-center space-x-3">
      <div className="hidden sm:flex items-center space-x-2">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Language:</span>
      </div>
      
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-40 border-border/50 hover:border-primary/50 transition-colors">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-0 shadow-xl">
          {supportedLanguages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.name}
              className="cursor-pointer hover:bg-muted/50 focus:bg-primary/10 focus:text-primary"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="font-medium text-foreground">{language.name}</div>
                    <div className="text-xs text-muted-foreground">{language.native}</div>
                  </div>
                </div>
                {language.name === selectedLanguage && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 ml-2">
                    Active
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mobile Language Button */}
      <Button 
        variant="outline" 
        size="sm" 
        className="sm:hidden p-2 border-border/50"
        onClick={() => {/* Could open a modal on mobile */}}
      >
        <Globe className="h-4 w-4" />
      </Button>
    </div>
  );
};