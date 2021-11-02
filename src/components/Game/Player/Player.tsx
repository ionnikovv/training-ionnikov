import { useEffect, useRef, useState } from 'react';
import { TICK } from '../../../ConstantValues/ConstValues';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
  playerCoord: number;
  isGameStarted: boolean;
  isPaused: boolean;
  onChangePlayerCoord: (newPlayerCoord: number) => void;
};

export const Player = ({
  pokemonUrl,
  onChangePlayerCoord,
  playerCoord,
  isGameStarted,
  isPaused,
}: Props): JSX.Element => {
  const [pokemonImage, setPokemonImage] = useState('');
  const webCameraElement = document.getElementById('webcamera');
  const jumpProgressRef = useRef(0);

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
    const handleIntervalKeyUp = () => {
      if (jumpProgressRef.current > Math.PI && returnIntervalId !== null) {
        jumpProgressRef.current = 0;
        clearInterval(returnIntervalId);
        intervalId = null;
        returnIntervalId = null;
        return;
      }
      if (jumpProgressRef.current < Math.PI / 2) {
        const newProgress = Math.PI / 2 - jumpProgressRef.current;
        jumpProgressRef.current += newProgress * 2;
      }
      const coord = Math.abs(Math.sin(jumpProgressRef.current));
      onChangePlayerCoord(Math.floor(coord * -100));
      jumpProgressRef.current += step;
    };

    const step = Math.PI / 60;
    if (isPaused) return;

    if (!isPaused && jumpProgressRef.current > 0)
      returnIntervalId = setInterval(handleIntervalKeyUp, TICK) as unknown as number;

    const handleKeydown = (event: KeyboardEvent | TouchEvent | Event) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;

      if (!intervalId) {
        const handleIntervalKeydown = () => {
          if (jumpProgressRef.current > Math.PI && intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            jumpProgressRef.current = 0;
            if (returnIntervalId) clearInterval(returnIntervalId);
            returnIntervalId = null;
            return;
          }
          const coord = Math.abs(Math.sin(jumpProgressRef.current));

          onChangePlayerCoord(Math.floor(coord * -100));
          jumpProgressRef.current += step;
        };
        intervalId = setInterval(handleIntervalKeydown, TICK) as unknown as number;
        handleIntervalKeydown();
      }
    };

    const handleKeyUp = (event: KeyboardEvent | TouchEvent | Event) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!returnIntervalId) {
        returnIntervalId = setInterval(handleIntervalKeyUp, TICK) as unknown as number;
        handleIntervalKeyUp();
        if (intervalId) clearInterval(intervalId);
      }
    };
    if (isGameStarted) {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('touchstart', handleKeydown, false);

      webCameraElement?.addEventListener('setDownAi', handleKeyUp);
      webCameraElement?.addEventListener('setUpAI', handleKeydown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('touchstart', handleKeydown, false);
      document.removeEventListener('touchend', handleKeyUp, false);
      webCameraElement?.removeEventListener('setDownAi', handleKeyUp);
      webCameraElement?.removeEventListener('setUpAI', handleKeydown);
      if (intervalId) clearInterval(intervalId);
      if (returnIntervalId) clearInterval(returnIntervalId);
    };
  }, [onChangePlayerCoord, isGameStarted, isPaused, webCameraElement]);

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
