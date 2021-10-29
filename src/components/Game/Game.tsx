import { useEffect, useState } from 'react';
import { TICK } from '../../ConstantValues/ConstValues';
import { ObstacleEntity } from '../../types/GameObstacle';
import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { GameObstacle } from './Obstacle/GameObstacle';
import { Player } from './Player/Player';

let ObstacleID = 1;

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

const generateObstacle = (): ObstacleEntity => {
  const height = Math.random() * (20 - 60) + 60;
  const y = Math.random() * (0 - 50) + 50;
  return { height, x: 100, y, id: ObstacleID++ };
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
    }, TICK * 80);
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
        obstacles.map((obstacle) => ({ ...obstacle, x: obstacle.x - 1 })).filter((obstacle) => obstacle.x !== 0)
      );
    }, TICK / 2);
    return () => {
      clearInterval(intervalId);
    };
  }, [isGameSessionStarted]);

  useEffect(() => {
    obstacles.forEach((obstacle) => {
      if (obstacle.x <= 11 && -playerCoord <= obstacle.height) {
        setTimeout(() => {
          setPlayerCoord(0);
          setIsGameSessionStarted(false);
        }, TICK);
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
