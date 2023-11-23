import { createContext } from "react";

export const IsAnonContext = createContext({
  isAnon: false,
  setIsAnon: (b: boolean) => {},
});
