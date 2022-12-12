import { useState } from "react";

import pokemons from "@/pokemons.json";

import "./globals.scss";

function App() {
  const [count, setCount] = useState(0);

  console.log(pokemons);
  return (
    <div>
      <h1>Pokedex</h1>
    </div>
  );
}

export default App;
