import { BrowserRouter } from "react-router-dom";

import pokemons from "@/pokemons.json";

import { PokedexProvider } from "../PokedexContext";
import PokemonCard from "./PokemonCard";

export default {
  title: "Pokemons/PokemonCard",
  component: PokemonCard,
};

const Template = (args) => (
  <BrowserRouter>
    <PokedexProvider>
      <PokemonCard {...args} />
    </PokedexProvider>
  </BrowserRouter>
);

export const Bulbasaur = Template.bind({});
Bulbasaur.args = {
  pokemon: pokemons.results[0],
};

export const Ivysaur = Template.bind({});
Ivysaur.args = {
  pokemon: pokemons.results[1],
};
