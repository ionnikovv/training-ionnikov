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
  const height = Math.random() * (5 - 21) + 21;
  const y = Math.random() * (150 - 100) + 100;
  return { height, x: 100, y };
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  const [playerCoord, setPlayerCoord] = useState(0);
  const [obstacles, setObstacles] = useState<ObstacleEntity[]>([{ height: 21, x: 100, y: 100 }]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomValue = Math.random() * (70 - 50) + 50;
      if (randomValue > 100) return;

      const newObstacle = generateObstacle();
      setObstacles((obstacles) => [...obstacles, newObstacle]);
    }, TICK * 70) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObstacles((obstacles) =>
        obstacles.map((obstacle) => {
          return { ...obstacle, x: obstacle.x - 1 };
        })
      );
    }, TICK / 2) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObstacles((obstacles) => obstacles.filter((obstacle) => obstacle.x !== 0));
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
            {obstacles.map((obstacle, index) => (
              <GameObstacle {...obstacle} key={index} />
            ))}
            <Player pokemonUrl={pokemonPlayer?.url} playerCoord={playerCoord} onChangePlayerCoord={setPlayerCoord} />
          </div>
        </div>
      </div>
    </div>
  );
};
