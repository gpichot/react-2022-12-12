import { BrowserRouter } from "react-router-dom";

import pokemons from "@/pokemons.json";

import PokemonCard from "./PokemonCard";

export default {
  title: "Pokemons/PokemonCard",
  component: PokemonCard,
};

const Template = (args) => (
  <BrowserRouter>
    <PokemonCard {...args} />
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
