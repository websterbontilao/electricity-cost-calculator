import { ReactComponentElement, ReactNode, createContext, useState } from "react"

const ThemeContext = createContext(false)

type ThemeProviderProps = {

  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {

  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme)
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      {children}
    </ThemeContext.Provider>
  )
}