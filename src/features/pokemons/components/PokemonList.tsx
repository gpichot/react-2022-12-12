import PokemonCard from "./PokemonCard";

function PokemonListStatistics({ pokemons }) {
  return <p>{pokemons.length}</p>;
}

export default function PokemonList({ pokemons }) {
  return (
    <>
      <PokemonListStatistics pokemons={pokemons} />
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
