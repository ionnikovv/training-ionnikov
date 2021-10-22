import { useEffect, useState } from 'react';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
  playerCoord: number;
  onChangePlayerCoord: (newPlayerCoord: number) => void;
};

const TICK = 40;

export const Player = ({ pokemonUrl, onChangePlayerCoord, playerCoord }: Props): JSX.Element => {
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

  useEffect(() => {
    let intervalId: number | null = null;
    let returnIntervalId: number | null = null;
    let jumpProgress = 0;
    const step = Math.PI / 20;

    const handleKeydown = (event: KeyboardEvent | TouchEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!intervalId) {
        intervalId = setInterval(() => {
          if (jumpProgress > Math.PI && intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            if (returnIntervalId) clearInterval(returnIntervalId);
            returnIntervalId = null;
            return;
          }
          const coord = Math.abs(Math.sin(jumpProgress));
          onChangePlayerCoord(coord * -60);
          jumpProgress += step;
        }, TICK) as unknown as number;
      }
    };

    const handleKeyUp = (event: KeyboardEvent | TouchEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!returnIntervalId) {
        returnIntervalId = setInterval(() => {
          if (!intervalId) return;
          clearInterval(intervalId);
          if (jumpProgress > Math.PI && returnIntervalId !== null) {
            jumpProgress = 0;
            clearInterval(returnIntervalId);
            intervalId = null;
            returnIntervalId = null;
            return;
          }
          if (jumpProgress < Math.PI / 2) {
            const newProgress = Math.PI / 2 - jumpProgress;
            jumpProgress += newProgress * 2;
          }
          const coord = Math.abs(Math.sin(jumpProgress));
          onChangePlayerCoord(coord * -60);
          jumpProgress += step;
        }, TICK) as unknown as number;
        if (intervalId) clearInterval(intervalId);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyUp);

    document.addEventListener('touchstart', handleKeydown, false);
    document.addEventListener('touchend', handleKeyUp, false);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('touchstart', handleKeydown, false);
      document.removeEventListener('touchend', handleKeyUp, false);
      intervalId && clearInterval(intervalId);
      returnIntervalId && clearInterval(returnIntervalId);
    };
  }, [onChangePlayerCoord]);

  const convertToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert}%`;
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
