import { useParams } from "react-router-dom";

import useFetchResource from "@/hooks/useFetchResource";

import PokemonTypePill from "./PokemonTypePill";

export default function PokemonDetailsPage() {
  const params = useParams();
  const { id } = params;

  const pokemonDetail = useFetchResource(
    `https://pokeapi.fly.dev/gpichot20221212/pokemons/${id}`
  );

  if (pokemonDetail.isLoading) {
    return <p>Loading...</p>;
  }

  if (pokemonDetail.error) {
    return <p>Something went wrong</p>;
  }

  const pokemon = pokemonDetail.data;

  return (
    <>
      <h1>{pokemon.name}</h1>
      <div>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      {pokemon.types.map((type) => (
        <PokemonTypePill key={type} type={type} />
      ))}

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>

      <h2>Stats</h2>
      <ul>
        {Object.entries(pokemon.stats).map(([statName, statValue]) => (
          <li key={statName}>
            {statName}: {statValue}
          </li>
        ))}
      </ul>
    </>
  );
}
