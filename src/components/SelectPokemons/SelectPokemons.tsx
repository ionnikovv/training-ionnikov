import { PokemonsData } from '../../types/PokemonsData';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';

type Props = {
  pokemons: PokemonsData[];
  selectedPokemons: string[];
  setSelectedPokemons: (arg0: string[]) => void;
  disabledPokemons: string[];
  selectedPokemonSize: number;
};

export function SelectPokemons({
  pokemons,
  selectedPokemons,
  setSelectedPokemons,
  disabledPokemons,
  selectedPokemonSize,
}: Props): JSX.Element {
  const onSelectPokemons = (pokemonName: string) => {
    if (disabledPokemons.includes(pokemonName)) return;
    if (selectedPokemons.length >= selectedPokemonSize) {
      selectedPokemons.shift() ?? '';
      setSelectedPokemons([...selectedPokemons, pokemonName]);
    } else setSelectedPokemons([...selectedPokemons, pokemonName]);
  };
  const onDeselectPokemons = (pokemonName: string) => {
    setSelectedPokemons(selectedPokemons.filter((item) => item !== pokemonName));
  };

  return (
    <div>
      <div className='pokemon-cards'>
        {pokemons.map((pokemonItem) => {
          const isPokemonSelected = selectedPokemons.includes(pokemonItem.name);
          return (
            <PokemonCard
              pokemonItem={pokemonItem}
              key={pokemonItem.name}
              isPokemonSelected={isPokemonSelected}
              onClick={() =>
                isPokemonSelected ? onDeselectPokemons(pokemonItem.name) : onSelectPokemons(pokemonItem.name)
              }
            />
          );
        })}
      </div>
    </div>
  );
}
