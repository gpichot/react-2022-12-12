import React from "react";

type PokedexType = {
  pokemonIds: number[];
  addPokemon: (id: number) => void;
  removePokemon: (id: number) => void;
};

export const PokedexContext = React.createContext<PokedexType | undefined>(
  undefined
);

export function PokedexProvider({ children }) {
  const [pokemonIds, setPokemonIds] = React.useState([]);

  const addPokemon = (pokemonId) => {
    setPokemonIds([...pokemonIds, pokemonId]);
  };
  const removePokemon = (pokemonId) => {
    setPokemonIds(pokemonIds.filter((id) => id !== pokemonId));
  };
  const contextValue = {
    pokemonIds,
    addPokemon,
    removePokemon,
  };
  return (
    <PokedexContext.Provider value={contextValue}>
      {children}
    </PokedexContext.Provider>
  );
}

export function usePokedex() {
  const context = React.useContext(PokedexContext);
  if (context === undefined) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }
  return context;
}
