import { PokemonsData } from '../../types/PokemonsData';

import './PokemonCard.css';

interface Props {
  pokemonItem: PokemonsData;
}

export function PokemonCard({ pokemonItem }: Props): JSX.Element {
  return (
    <div className='pokemon-card' key={pokemonItem.name}>
      <span className='pokemon-name'>{pokemonItem.name}</span>
      <div className='pokemon-image'>
          future img    
      </div>
    </div>
  );
}
