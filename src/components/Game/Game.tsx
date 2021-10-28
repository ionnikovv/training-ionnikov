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
  const height = Math.floor(Math.random() * (20 - 60) + 60);
  const y = Math.random() * (0 - 50) + 50;
  return { height, x: 100, y };
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  const [playerCoord, setPlayerCoord] = useState(0);
  const [obstacles, setObstacles] = useState<ObstacleEntity[]>([]);
  const [isGameSessionStarted, setIsGameSessionStarted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isGameSessionStarted) return;
      const randomValue = Math.random() * (100 - 50) + 50;
      if (randomValue > 100) return;
      const newObstacle = generateObstacle();
      setObstacles((obstacles) => [...obstacles, newObstacle]);
    }, TICK * 80) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameSessionStarted]);

  useEffect(() => {
    if (!isGameSessionStarted) {
      setObstacles([]);
      return;
    }
    const intervalId = setInterval(() => {
      setObstacles((obstacles) =>
        obstacles.map((obstacle) => {
          return { ...obstacle, x: obstacle.x - 1 };
        })
      );
    }, TICK) as unknown as number;
    return () => {
      clearInterval(intervalId);
    };
  }, [isGameSessionStarted]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setObstacles((obstacles) => obstacles.filter((obstacle) => obstacle.x !== 0));
    }, TICK) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    obstacles.forEach((obstacle) => {
      if (obstacle.x <= 9 && -playerCoord <= obstacle.height && -playerCoord <= obstacle.y) {
        // eslint-disable-next-line no-debugger
        debugger;
        setPlayerCoord(0);
        setIsGameSessionStarted(false);
      }
    });
  }, [obstacles, playerCoord]);

  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>
      <div className='game-block-container'>
        <div className={isGameSessionStarted ? 'game-block animated' : 'game-block'}>
          <div className='game-field'>
            <Player
              isGameStarted={isGameSessionStarted}
              pokemonUrl={pokemonPlayer?.url}
              playerCoord={playerCoord}
              onChangePlayerCoord={setPlayerCoord}
            />
            {obstacles.map((obstacle, index) => (
              <GameObstacle {...obstacle} key={index} />
            ))}
          </div>
        </div>
        {!isGameSessionStarted && (
          <div className='btn-start-wrapper'>
            <button className='btn-start' onClick={() => setIsGameSessionStarted(true)}>
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
