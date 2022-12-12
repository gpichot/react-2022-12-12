import React from "react";
import { Link } from "react-router-dom";

import { PokemonDetail } from "../types";
import PokemonTypePill from "./PokemonTypePill";

import styles from "./PokemonCard.module.scss";

type PokemonCardProps = {
  /**
   * Mon pokemon
   */
  pokemon: PokemonDetail;
};

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const types = pokemon.types.map((type) => (
    <PokemonTypePill key={type} type={type} />
  ));

  return (
    <div
      className={styles.pokemonCard}
      style={{
        backgroundColor: isHovered ? "#ffffff44" : "",
        border: "1px solid black",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.pokemonContent}>
        <h2 className={styles.pokemonCardName}>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} height={96} />
        <p>{types}</p>
      </div>
      <div className={styles.pokemonCardActions}>
        <Link to={`/pokemons/${pokemon.id}`}>Details</Link>
      </div>
    </div>
  );
}
