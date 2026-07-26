import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    dark: isDarkMode,
    colors: isDarkMode ? {
      background: '#020617',
      card: '#0f172a',
      text: '#ffffff',
      subtext: '#94a3b8',
      primary: '#22c55e',
      border: '#1e293b'
    } : {
      background: '#f8fafc',
      card: '#ffffff',
      text: '#020617',
      subtext: '#64748b',
      primary: '#22c55e',
      border: '#e2e8f0'
    },
    toggleTheme: () => setIsDarkMode(!isDarkMode)
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;