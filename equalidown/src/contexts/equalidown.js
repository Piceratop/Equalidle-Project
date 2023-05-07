import { createContext } from "react";

export const equalidownContext = createContext();

export const equalidownProvider = ({ children }) => {
  return <equalidownContext.Provider>{children}</equalidownContext.Provider>;
};
