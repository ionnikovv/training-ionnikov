import { useEffect, useState } from 'react';
import { isPokemonInfoResponse, PokemonsData } from '../../types/PokemonsData';
import { Loader } from './../Common/Loader/Loader';

import './PokemonCard.css';

interface Props {
  pokemonItem: PokemonsData;
  onClick: () => void;
  isPokemonSelected: boolean;
}

export function PokemonCard({ pokemonItem, onClick, isPokemonSelected }: Props): JSX.Element {
  const [pokemonInfo, setPokemonInfo] = useState({ weight: 0, baseExperience: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonImage, setPokemonImage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    async function getPokemonsInfo() {
      const response = await fetch(pokemonItem.url);
      const body = (await response.json()) as unknown;
      if (isPokemonInfoResponse(body)) {
        setPokemonInfo({
          weight: body.weight,
          baseExperience: body.base_experience,
          height: body.height,
        });
        setPokemonImage(body.sprites.other.dream_world.front_default);
        setIsLoading(false);
      }
    }
    getPokemonsInfo();
  }, [pokemonItem?.url]);

  return (
    <div className={isPokemonSelected ? 'pokemon-card active' : 'pokemon-card'} onClick={onClick}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='pokemon-header-wrapper'>
          <span className='pokemon-name'>{pokemonItem.name}</span>
          <div className='pokemon-common-info'>
            <span>Weight: {pokemonInfo.weight}</span>
            <span>Base experience: {pokemonInfo.baseExperience}</span>
            <span>Height: {pokemonInfo.height}</span>
          </div>
          <div className='pokemon-image'>
            <img src={pokemonImage} alt='' />
          </div>
        </div>
      )}
    </div>
  );
}
