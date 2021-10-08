// import { useState } from 'react';
import { DISABLED_POKEMONS } from '../../App';
import { PokemonsData } from '../../types/PokemonsData';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';

type Props = {
  pokemons: PokemonsData[];
  selectedPokemons: string[];
  setSelectedPokemons: (arg0: string[]) => void;
};

const SELECTED_POKEMON_SIZE = 2;

export function SelectPokemons({ pokemons, selectedPokemons, setSelectedPokemons }: Props): JSX.Element {
  const onSelectPokemons = (pokemonName: string) => {
    if (DISABLED_POKEMONS.includes(pokemonName)) return;
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
