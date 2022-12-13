import React from "react";
import { Link } from "react-router-dom";

import useFetchResource from "@/hooks/useFetchResource";

import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [offset, setOffset] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [currentView, setCurrentView] = React.useState("cards");

  const url = `https://pokeapi.fly.dev/gpichot20221212/pokemons?offset=${offset}&limit=400`;
  const {
    data: pokemonsData,
    isLoading,
    isFetching,
    error,
  } = useFetchResource(url);

  const pokemons = React.useMemo(() => {
    return pokemonsData?.results.filter((pokemon) =>
      pokemon.name.includes(searchText)
    );
  }, [searchText, pokemonsData?.results]);

  if (isLoading || !pokemonsData) {
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
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
