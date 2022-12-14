import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { usePokedex } from "@/features/pokemons/PokedexContext";
import useFetchResource from "@/hooks/useFetchResource";

import PokemonTypePill from "./PokemonTypePill";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export default function PokemonDetailsPage() {
  const params = useParams();
  const { id } = params;

  const url = `https://pokeapi.fly.dev/gpichot20221212/pokemons/${id}`;
  const pokemonDetailQuery = useQuery(
    ["pokemon-detail", id],
    async () => {
      await sleep(2000);
      const response = await fetch(url);
      return response.json();
    },
    {
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
    }
  );

  const { pokemonIds, addPokemon, removePokemon } = usePokedex();

  if (pokemonDetailQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (pokemonDetailQuery.isError) {
    return <p>Something went wrong</p>;
  }

  const pokemon = pokemonDetailQuery.data;

  const isPokemonInPokedex = pokemonIds.includes(pokemon.id);

  const handleCaptureOrRelease = () => {
    if (isPokemonInPokedex) {
      removePokemon(pokemon.id);
    } else {
      addPokemon(pokemon.id);
    }
  };

  return (
    <>
      <h1>{pokemon.name}</h1>
      <div>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      <p>{pokemonDetailQuery.isFetching ? "Fetching" : "-"}</p>

      <button onClick={() => pokemonDetailQuery.refetch()}>Refetch</button>

      {pokemon.types.map((type) => (
        <PokemonTypePill key={type} type={type} />
      ))}

      <button onClick={handleCaptureOrRelease}>
        {isPokemonInPokedex ? "Release" : "Capture"}
      </button>

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
