import { useState } from 'react';
import { Obstacle as ObstacleComponent } from './components/Game/Obstacle/Obstacle';
import { backgroundSpeed } from './ConstantValues/ConstValues';
import { Obstacle } from './types/GameTypes';

export const StateForGame = (): JSX.Element => {
  const [playerCoord] = useState(100);
  const [obstacles] = useState<Obstacle[]>([
    { height: 10, x: 1, y: 0 },
    { height: 15, x: 10, y: 10 },
  ]);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerCoord}</span>
      <span>
        Obstacles
        {obstacles.map((obstacle) => {
          <ObstacleComponent height={obstacle.height} coordX={obstacle.x} />;
        })}
      </span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
