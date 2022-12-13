import React from "react";

import useFetchResource from "@/hooks/useFetchResource";

import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [offset, setOffset] = React.useState(0);

  const url = `https://pokeapi.fly.dev/gpichot20221212/pokemons?offset=${offset}&limit=9`;
  const { data: pokemons, isLoading, error } = useFetchResource(url);

  if (isLoading || !pokemons) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          disabled={!pokemons.previous}
          onClick={() => setOffset(pokemons.previousOffset)}
        >
          Previous
        </button>
        <button
          disabled={!pokemons.next}
          onClick={() => setOffset(pokemons.nextOffset)}
        >
          Next
        </button>
      </nav>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
          gridGap: "1rem",
          padding: "1rem",
        }}
      >
        {pokemons.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
