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
  const [isJumping, setIsJumping] = useState(false);

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
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setIsJumping(true);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      setIsJumping(false);
    };
  }, []);

  useEffect(() => {
    if (!isJumping) return;
    let jumpProgress = 0.3;
    const step = Math.PI / 20;

    const intervalId = setInterval(() => {
      if (jumpProgress > Math.PI) {
        onChangePlayerCoord(0);
        setIsJumping(false);
        return;
      }
      const coord = Math.sin(jumpProgress) ** 2;
      onChangePlayerCoord(coord * -55);
      jumpProgress += step;
    }, TICK);

    return () => {
      clearInterval(intervalId);
    };
  }, [isJumping, onChangePlayerCoord]);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        onChangePlayerCoord(0);
        setIsJumping(false);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onChangePlayerCoord, playerCoord]);

  const convertToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert}%`;
  };

  const stylesJump = {
    top: convertToCssUnits(playerCoord),
    transition: 'top 0.1s',
  };

  return (
    <div className='player-wrapper' style={stylesJump}>
      <img className='pokemon' src={pokemonImage} />
      <img className='skate' src={skate} />
    </div>
  );
};
