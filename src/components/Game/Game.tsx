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
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

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
    if (paused) return;
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
  }, [isGameSessionStarted, paused]);

  useEffect(() => {
    obstacles.forEach((obstacle) => {
      if (obstacle.x <= 11 && -playerCoord <= obstacle.height) {
        setTimeout(() => {
          setPlayerCoord(0);
          setScore(0);
          setIsGameSessionStarted(false);
        }, TICK);
      }
    });
  }, [obstacles, playerCoord]);

  useEffect(() => {
    if (paused || !isGameSessionStarted) return;
    const IntervalId = setInterval(() => {
      setScore((prevValue) => prevValue + 1);
    }, TICK * 20);
    return () => {
      clearInterval(IntervalId);
    };
  }, [paused, isGameSessionStarted]);
  return (
    <div className='main-game-wrapper'>
      <div className='btn-pause-wrapper'></div>
      <div className='game-wrapper'>
        <span className='game-logo'>RUN! {pokemonPlayer?.name}! RUN!</span>
        <div className='game-block-container'>
          <div className={isGameSessionStarted ? (!paused ? 'game-block animated' : 'game-block') : 'game-block'}>
            <div className='game-field'>
              <Player
                isGameStarted={isGameSessionStarted}
                isPaused={paused}
                pokemonUrl={pokemonPlayer?.url}
                playerCoord={playerCoord}
                onChangePlayerCoord={setPlayerCoord}
              />
              {obstacles.map((obstacle, index) => (
                <GameObstacle {...obstacle} key={index} />
              ))}
            </div>
          </div>
          {isGameSessionStarted && (
            <div className='btn-pause-wrapper'>
              <button
                className='btn-pause'
                onClick={() => {
                  if (isGameSessionStarted) setPaused((prevValue) => !prevValue);
                }}
              >
                PAUSE
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='game-score'>
        <span>SCORE</span>
        <span>{score}</span>
      </div>
      {!isGameSessionStarted && (
        <div className='btn-start-wrapper'>
          <button className='btn-start' onClick={() => setIsGameSessionStarted(true)}>
            Start
          </button>
        </div>
      )}
    </div>
  );
};
