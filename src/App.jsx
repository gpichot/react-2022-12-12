import { Link, Route, Routes } from "react-router-dom";

import PokemonDetailsPage from "./features/pokemons/components/PokemonDetailsPage";
import PokemonForm from "./features/pokemons/components/PokemonForm";
import PokemonList from "./features/pokemons/components/PokemonList";

import "./globals.scss";

function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/pokemons/new">Add a pokemon</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemons/new" element={<PokemonForm />} />
        <Route path="/pokemons/:id" element={<PokemonDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
