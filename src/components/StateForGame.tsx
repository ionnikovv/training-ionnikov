import { useState } from 'react';
import { backgroundSpeed } from './../ConstantValues/ConstValues';
import { Obstacle } from './Game/Obstacle/Obstacle';

export const StateForGame = (): JSX.Element => {
  const [playerCoord] = useState(100);
  const [obstacles] = useState([
    { height: 10, coordX: 1 },
    { height: 20, coordX: 3 },
  ]);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerCoord}</span>
      <span>
        Obstacles
        {obstacles.map((obstacle) => {
          <Obstacle height={obstacle.height} coordX={obstacle.coordX} />;
        })}
      </span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
