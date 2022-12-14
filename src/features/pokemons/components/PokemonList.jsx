import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { fetchPokemons, QueryKeys, usePokemonListQuery } from "../query-hooks";
import PokemonCard from "./PokemonCard";

const limit = 9;
export default function PokemonList() {
  const [offset, setOffset] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [currentView, setCurrentView] = React.useState("cards");

  const query = usePokemonListQuery({ offset, limit, searchText });

  const { data: pokemonsData, isLoading, isFetching, isError } = query;

  const queryClient = useQueryClient();

  // Fetch next page
  React.useEffect(() => {
    const newParams = { offset: offset + limit, limit, searchText };

    const queryKey = QueryKeys.pokemonList(newParams);
    queryClient.prefetchQuery(queryKey, () => fetchPokemons(newParams));
  }, [offset, queryClient, searchText]);

  console.log("Render", query.status, query);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  const pokemons = pokemonsData.results;

  return (
    <>
      <button onClick={() => query.refetch()}>Refetch</button>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          disabled={!pokemonsData.previous}
          onClick={() => setOffset(pokemonsData.previousOffset)}
        >
          Previous
        </button>
        {isFetching ? <p>Fetching...</p> : <p>-</p>}
        <button
          disabled={!pokemonsData.next}
          onClick={() => setOffset(pokemonsData.nextOffset)}
        >
          Next
        </button>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1.5rem",
            margin: "1rem 0",
          }}
          onBlur={(e) => setSearchText(e.target.value)}
        />
        <button
          disabled={currentView === "cards"}
          onClick={() => setCurrentView("cards")}
        >
          Cards
        </button>
        <button
          disabled={currentView === "list"}
          onClick={() => setCurrentView("list")}
        >
          List
        </button>
      </div>
      {currentView === "cards" ? (
        <PokemonCardList pokemons={pokemons} />
      ) : (
        <PokemonTableList pokemons={pokemons} />
      )}
    </>
  );
}

const MemoizedPokemonCard = React.memo(PokemonCard);

function PokemonCardList({ pokemons }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
        gridGap: "1rem",
        padding: "1rem",
      }}
    >
      {pokemons.map((pokemon) => (
        <MemoizedPokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

function PokemonTableList({ pokemons }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.name}</td>
            <td>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{
                  width: "100px",
                }}
              />
            </td>
            <td>
              <Link to={`/pokemons/${pokemon.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
