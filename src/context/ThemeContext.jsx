import React, { createContext, useContext } from 'react';

// Simple context that doesn't actually toggle themes but provides a consistent API
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always light theme
  const isDarkMode = false;
  const toggleTheme = () => {}; // No-op function

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;