import React, { createContext, useState } from 'react';

export const MoodContext = createContext(null) 

const MoodProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  React.useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);


  const MoodInfo = {
    toggleTheme,
    theme,
  };
  return (
    <MoodContext.Provider value={MoodInfo}>{children}</MoodContext.Provider>
  );
};

export default MoodProvider;
