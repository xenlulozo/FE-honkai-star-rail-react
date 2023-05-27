import React, { createContext, useContext } from "react";

const CharacterIdContext = createContext();

export const useCharacterId = () => useContext(CharacterIdContext);

export const CharacterIdProvider = ({ children, id }) => (
  <CharacterIdContext.Provider value={id}>
    {children}
  </CharacterIdContext.Provider>
);
