import { createContext, useState } from "react";

export let ThemeChange = createContext();
const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const changeTheme = () => {
    setDarkTheme((darkTheme) => !darkTheme);
  };

  return (
    <ThemeChange.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </ThemeChange.Provider>
  );
};
export default ThemeProvider;
