import React from "react";

import InputControl from "@/components/InputControl";

import styles from "./PokemonForm.module.scss";

export default function PokemonForm() {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name,
      type,
      height: parseInt(height),
      weight: parseInt(weight),
    };

    console.log(payload);
  };

  const isDisabled = name === "" || type === "";

  return (
    <form className={styles.pokemonForm} onSubmit={handleSubmit}>
      <div className={styles.pokemonFormFields}>
        <InputControl
          required
          label="Name"
          name="name"
          value={name}
          placeholder="Pikachu"
          onChange={(event) => setName(event.target.value)}
        />
        <InputControl
          required
          label="Type"
          name="type"
          value={type}
          placeholder="electric"
          onChange={(event) => setType(event.target.value)}
        />
        <InputControl
          label="Height"
          name="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
        <InputControl
          label="Weight"
          name="weight"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
      </div>
      <button type="submit" disabled={isDisabled}>
        Create
      </button>
    </form>
  );
}
