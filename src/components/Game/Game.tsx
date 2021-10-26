import { useEffect, useState } from 'react';
import { TICK } from '../../ConstantValues/ConstValues';
import { ObstacleEntity } from '../../types/GameObstacle';
import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { GameObstacle } from './Obstacle/GameObstacle';
import { Player } from './Player/Player';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

const generateObstacle = (): ObstacleEntity => {
  const height = Math.random() * (5 - 23) + 23;
  const y = Math.random() * (150 - 100) + 100;
  return { height, x: 100, y };
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  const [playerCoord, setPlayerCoord] = useState(0);
  const [obstacles, setObstacles] = useState<ObstacleEntity[]>([{ height: 23, x: 100, y: 100 }]);

  const randomIntervalGeneration = () => {
    return Math.random() * (70 - 50) + 50;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newObstacle = generateObstacle();
      setObstacles((obstacles) => [...obstacles, newObstacle]);
    }, TICK * randomIntervalGeneration()) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObstacles((obstacles) => obstacles.map((obstacle) => ({ ...obstacle, x: obstacle.x - 1 })));
    }, TICK) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>
      <div className='game-block-container'>
        <div className='game-block'>
          <div className='game-field'>
            {obstacles.map((obstacle) => (
              <GameObstacle {...obstacle} />
            ))}
            <Player pokemonUrl={pokemonPlayer?.url} playerCoord={playerCoord} onChangePlayerCoord={setPlayerCoord} />
          </div>
        </div>
      </div>
    </div>
  );
};
