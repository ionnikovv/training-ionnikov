import { useEffect, useState } from 'react';
import { TICK } from '../../../ConstantValues/ConstValues';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
  playerCoord: number;
  isGameStarted: boolean;
  onChangePlayerCoord: (newPlayerCoord: number) => void;
};

export const Player = ({ pokemonUrl, onChangePlayerCoord, playerCoord, isGameStarted }: Props): JSX.Element => {
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
    const step = Math.PI / 70;

    const handleKeydown = (event: KeyboardEvent | TouchEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;

      if (!intervalId) {
        const handleIntervalKeydown = () => {
          if (jumpProgress > Math.PI && intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            jumpProgress = 0;
            if (returnIntervalId) clearInterval(returnIntervalId);
            returnIntervalId = null;
            return;
          }
          const coord = Math.abs(Math.sin(jumpProgress));
          onChangePlayerCoord(Math.floor(coord * -100));
          jumpProgress += step;
        };
        intervalId = setInterval(handleIntervalKeydown, TICK) as unknown as number;
        handleIntervalKeydown();
      }
    };

    const handleKeyUp = (event: KeyboardEvent | TouchEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!returnIntervalId) {
        const handleIntervalKeyUp = () => {
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
          onChangePlayerCoord(Math.floor(coord * -100));
          jumpProgress += step;
        };
        returnIntervalId = setInterval(handleIntervalKeyUp, TICK) as unknown as number;
        handleIntervalKeyUp();
        if (intervalId) clearInterval(intervalId);
      }
    };
    if (isGameStarted) {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('touchstart', handleKeydown, false);
      document.addEventListener('touchend', handleKeyUp, false);
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('touchstart', handleKeydown, false);
      document.removeEventListener('touchend', handleKeyUp, false);
      if (intervalId) clearInterval(intervalId);
      if (returnIntervalId) clearInterval(returnIntervalId);
    };
  }, [onChangePlayerCoord, isGameStarted]);

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
