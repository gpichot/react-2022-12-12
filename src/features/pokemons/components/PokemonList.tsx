import pokemons from "@/pokemons.json";

import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  return (
    <>
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
