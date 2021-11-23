import { useEffect, useState } from 'react';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
  playerCoord: number;
};

export const Player = ({ pokemonUrl, playerCoord }: Props): JSX.Element => {
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

  const convertToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert + 100}%`;
  };

  const stylesJump = {
    top: convertToCssUnits(playerCoord),
  };
  return (
    <div className='player-wrapper' style={stylesJump}>
      <img className='pokemon' src={pokemonImage} />
      <img className='skate' src={skate} />
    </div>
  );
};
