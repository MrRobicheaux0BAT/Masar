import React from "react";

// Create language context
const LanguageContext = React.createContext();

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [isArabic, setIsArabic] = React.useState(() => {
    // Initialize from localStorage or default to false
    const saved = localStorage.getItem('masar-language');
    return saved === 'ar';
  });

  const toggleLanguage = () => {
    const newLang = !isArabic;
    setIsArabic(newLang);
    localStorage.setItem('masar-language', newLang ? 'ar' : 'en');
    // Update document direction
    document.documentElement.dir = newLang ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang ? 'ar' : 'en';
  };

  const t = (key) => key[isArabic ? 'ar' : 'en'];

  // Set initial document direction
  React.useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [isArabic]);

  return (
    <LanguageContext.Provider value={{ isArabic, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};