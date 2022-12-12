import { useParams } from "react-router-dom";

export default function PokemonDetailsPage() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <h1>Details for pokemon with id {params.id}</h1>
    </>
  );
}
