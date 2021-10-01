import { useEffect, useState } from 'react';
import { isPokemonInfoResponse, PokemonsData } from '../../types/PokemonsData';

import './PokemonCard.css';

interface Props {
  pokemonItem: PokemonsData;
}

export function PokemonCard({ pokemonItem }: Props): JSX.Element {
  const [pokemonInfo, setPokemonInfo] = useState({ pokemonImageSrc: '', weight: 0, baseExperience: 0, height: 0 });

  useEffect(() => {
    async function getPokemonsInfo() {
      const response = await fetch(pokemonItem.url);
      const body = (await response.json()) as unknown;
      if (isPokemonInfoResponse(body)) {
        setPokemonInfo({
          pokemonImageSrc: body.sprites.other.dream_world.front_default,
          weight: body.weight,
          baseExperience: body.base_experience,
          height: body.height,
        });
      } else throw new Error('Invalid Api Response!');
    }
    getPokemonsInfo();
  }, [pokemonItem.url]);

  return (
    <div className='pokemon-card' key={pokemonItem.name}>
      <div className='pokemon-header-wrapper'>
        <span className='pokemon-name'>{pokemonItem.name}</span>
        <div className='pokemon-common-info'>
          <span>Weight: {pokemonInfo.weight}</span>
          <span>Base experience: {pokemonInfo.baseExperience}</span>
          <span>Height: {pokemonInfo.height}</span>
        </div>
      </div>
      <div className='pokemon-image'>
        <img src={pokemonInfo.pokemonImageSrc} alt='' />
      </div>
    </div>
  );
}
