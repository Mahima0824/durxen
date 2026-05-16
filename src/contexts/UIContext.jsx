import { createContext, useState, useEffect } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [uitheme, setUitheme] = useState("default");

  useEffect(() => {
    document.body.setAttribute("data-theme-colors", uitheme);
  }, [uitheme]);

  return (
    <UIContext.Provider value={{ uitheme, setUitheme }}>
      {children}
    </UIContext.Provider>
  );
}