import React, { createContext, useContext } from "react";
import { InitializeStore } from './store';
const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = InitializeStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used within StoreProvider.");
  return store;
};
