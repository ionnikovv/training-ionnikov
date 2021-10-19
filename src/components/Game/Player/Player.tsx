import { useEffect, useState } from 'react';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
  playerCoord: number;
  setPlayerCoord: (newPlayerCoord: number) => void;
};

export const Player = ({ pokemonUrl, setPlayerCoord, playerCoord }: Props): JSX.Element => {
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
      if (event.key === 'ArrowUp') {
        setIsJumping(true);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (!isJumping) return;

    let jumpProgress = 0.1;
    const step = Math.PI / 20;
    const intervalId = setInterval(() => {
      if (jumpProgress > Math.PI) {
        setPlayerCoord(0);
        setIsJumping(false);
        return;
      }
      // const coord = step ** 2 * 40;
      const coord = Math.sin(jumpProgress);

      setPlayerCoord(coord * -50);
      jumpProgress += step;
    }, 50);

    return () => clearInterval(intervalId);
  }, [isJumping, setPlayerCoord]);

  const convertToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert}%`;
  };

  const stylesJump = {
    top: convertToCssUnits(playerCoord),
    transition: 'top 0.25s',
  };

  return (
    <div className='player-wrapper' style={stylesJump}>
      <img className='pokemon' src={pokemonImage} />
      <img className='skate' src={skate} />
    </div>
  );
};
