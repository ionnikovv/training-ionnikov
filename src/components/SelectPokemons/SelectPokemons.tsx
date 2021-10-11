import { PokemonsData } from '../../types/PokemonsData';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';

type Props = {
  pokemons: PokemonsData[];
  selectedPokemons: string[];
  onSelectedPokemons: (arg0: string, arg1: boolean) => void;
};

export function SelectPokemons({ pokemons, selectedPokemons, onSelectedPokemons }: Props): JSX.Element {
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
              onClick={() => onSelectedPokemons(pokemonItem.name, isPokemonSelected)}
            />
          );
        })}
      </div>
    </div>
  );
}
