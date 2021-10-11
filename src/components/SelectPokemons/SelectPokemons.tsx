import { PokemonsData } from '../../types/PokemonsData';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';

type Props = {
  pokemons: PokemonsData[];
  selectedPokemons: string[];
  onSelectPokemon: (pokemonName: string, isCurrentlySelected: boolean) => void;
};

export function SelectPokemons({ pokemons, selectedPokemons, onSelectPokemon }: Props): JSX.Element {
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
              onClick={() => onSelectPokemon(pokemonItem.name, isPokemonSelected)}
            />
          );
        })}
      </div>
    </div>
  );
}
