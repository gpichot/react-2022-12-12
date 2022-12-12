import { pokemonTypesColor, pokemonTypesEmoji } from "../common";
import { PokemonType } from "../types";

import styles from "./PokemonTypePill.module.scss";

type PokemonTypePillProps = {
  type: PokemonType;
};
export default function PokemonTypePill(props: PokemonTypePillProps) {
  const { type } = props;

  return (
    <span
      className={styles.pokemonType}
      style={{
        backgroundColor: `${pokemonTypesColor[type]}66`,
      }}
    >
      {pokemonTypesEmoji[type]} {type}
    </span>
  );
}
