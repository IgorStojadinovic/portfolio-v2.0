import { ContextType, createContext, useContext, useState } from "react";

export const Context = createContext({
  setActiveLink: (activeLink: string) => {},
  activeLink: "Home",
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeLink, setActiveLink] = useState<string | "Home">("Home");
  return (
    <Context.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = (): ContextType<typeof Context> => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context is not defined");
  }
  return context;
};
