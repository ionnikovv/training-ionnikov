import { useState } from 'react';
import { Obstacle } from './components/Game/Obstacle/Obstacle';
import { backgroundSpeed } from './ConstantValues/ConstValues';
import { ObstaclesType } from './types/GameTypes';

export const StateForGame = (): JSX.Element => {
  const [playerCoord] = useState(100);
  const [obstacles] = useState<ObstaclesType[]>([{ height: 10, x: 1, y: 0 }]);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerCoord}</span>
      <span>
        Obstacles
        {obstacles.map((obstacle) => {
          <Obstacle height={obstacle.height} coordX={obstacle.x} />;
        })}
      </span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
