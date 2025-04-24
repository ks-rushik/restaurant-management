'use client';

import { useState, createContext } from 'react';

type ITheme = 'light' | 'dark';

type IThemeContextProps =  {
  theme: ITheme;
  toggleTheme: () => void;
}

 export const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ITheme>('light'); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  };
  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
