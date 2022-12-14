import { useQuery } from "@tanstack/react-query";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const QueryKeys = {
  pokemonList: ({ offset, limit, searchText }) => [
    "pokemons",
    { offset, limit, searchText },
  ],
};

export async function fetchPokemons({ offset, limit, searchText }) {
  const url = `https://pokeapi.fly.dev/gpichot2220221212/pokemons/?offset=${offset}&limit=${limit}&searchText=${searchText}`;

  await sleep(2000);
  const response = await fetch(url);
  return response.json();
}

export function usePokemonListQuery({ offset, limit, searchText }) {
  const queryKey = QueryKeys.pokemonList({ offset, limit, searchText });

  return useQuery(
    queryKey,
    () => fetchPokemons({ offset, limit, searchText }),
    {
      keepPreviousData: true,
      staleTime: 30 * 1000,
      //refetchOnMount: false,
    }
  );
}
