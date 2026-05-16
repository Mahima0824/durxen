// src/contexts/RTLContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const RTLContext = createContext();

export const RTLProvider = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // URL se dir parameter check karo (agar external link se aaye)
    const urlParams = new URLSearchParams(window.location.search);
    const dirParam = urlParams.get('dir');
    
    // localStorage se check karo
    const savedDirection = localStorage.getItem('app-direction');
    
    // Priority: URL > localStorage > default (ltr)
    let direction = 'ltr';
    
    if (dirParam === 'rtl' || dirParam === 'ltr') {
      direction = dirParam;
      localStorage.setItem('app-direction', dirParam);
      
      // URL se ?dir= parameter REMOVE kar do
      urlParams.delete('dir');
      const newUrl = urlParams.toString() 
        ? `${window.location.pathname}?${urlParams.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
    } else if (savedDirection === 'rtl' || savedDirection === 'ltr') {
      direction = savedDirection;
    }
    
    // State update karo
    const rtlMode = direction === 'rtl';
    setIsRTL(rtlMode);
    
    // HTML attributes set karo
    document.documentElement.setAttribute('dir', direction);
    document.body.setAttribute('dir', direction);
    
    // RTL class add/remove karo
    if (rtlMode) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
  }, []);

  const toggleRTL = () => {
    const newRTL = !isRTL;
    setIsRTL(newRTL);
    const direction = newRTL ? 'rtl' : 'ltr';
    
    document.documentElement.setAttribute('dir', direction);
    document.body.setAttribute('dir', direction);
    localStorage.setItem('app-direction', direction);
    
    if (newRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };

  return (
    <RTLContext.Provider value={{ isRTL, toggleRTL }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within RTLProvider');
  }
  return context;
};