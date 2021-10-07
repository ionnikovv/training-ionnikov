import { useState } from 'react';
import { PokemonsData } from '../../types/PokemonsData';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';
type Props = {
  pokemons: PokemonsData[];
};

const SELECTED_POKEMON_SIZE = 5;

export function SelectPokemons({ pokemons }: Props): JSX.Element {
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

  const onSelectPokemons = (pokemonName: string) => {
    if (pokemonName === 'pikachu') return;
    if (selectedPokemons.length >= SELECTED_POKEMON_SIZE) {
      selectedPokemons.shift() ?? '';

      setSelectedPokemons([...selectedPokemons, pokemonName]);
    } else setSelectedPokemons([...selectedPokemons, pokemonName]);
  };
  const onDeselectPokemons = (pokemonName: string) => {
    setSelectedPokemons(selectedPokemons.filter((item) => item !== pokemonName));
  };

  return (
    <div>
      Choosed pokemons:{' '}
      {selectedPokemons.map((pokemon) => {
        return <div>{pokemon}</div>;
      })}
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
