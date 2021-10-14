import { useEffect, useState } from 'react';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
};

export const Player = ({ pokemonUrl }: Props): JSX.Element => {
  const [pokemonImage, setPokemonImage] = useState('');
  useEffect(() => {
    async function getPokemonsInfo() {
      if (!pokemonUrl) return;
      const response = await fetch(pokemonUrl);
      const body = (await response.json()) as unknown;
      if (isPokemonInfoResponse(body)) {
        setPokemonImage(body.sprites.other.dream_world.front_default);
      }
    }
    getPokemonsInfo();
  }, [pokemonUrl]);

  return (
    <div className='player-wrapper'>
      <img className='skate' src={skate} />
      <img className='pokemon' src={pokemonImage} />
    </div>
  );
};
