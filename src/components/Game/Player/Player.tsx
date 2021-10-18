import { useEffect, useState } from 'react';
import { isPokemonInfoResponse } from '../../../types/PokemonsData';
import skate from './../../../assets/skate.png';
import './Player.css';

type Props = {
  pokemonUrl: string | undefined;
};

export const Player = ({ pokemonUrl }: Props): JSX.Element => {
  const [pokemonImage, setPokemonImage] = useState('');
  const [playerCoord, setplayerCoord] = useState(0);

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
        setInterval(() => setplayerCoord((prevCoord) => prevCoord + 500), 500);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    // return () => {
    //   document.removeEventListener('keydown', handleKeydown);
    // };
  }, []);

  const convertToCssUnits = (valueToConvert: number): number => {
    //   //  0 - 600
    //   // 100 - 400
    const ratio = 0.6;
    if (valueToConvert === 0) return 600;
    else return valueToConvert * ratio;
  };

  const stylesJump = {
    top: convertToCssUnits(playerCoord),
  };

  return (
    <div className='player-wrapper'>
      <img className='pokemon' src={pokemonImage} style={stylesJump} />
      <img className='skate' src={skate} />
    </div>
  );
};
