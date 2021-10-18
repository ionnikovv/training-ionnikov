import { useState } from 'react';
import { GameObstacle } from './components/Game/Obstacle/GameObstacle';
import { backgroundSpeed } from './ConstantValues/ConstValues';
import { Obstacle } from './types/GameTypes';

export const StateForGame = (): JSX.Element => {
  const [obstacles] = useState<Obstacle[]>([
    { height: 10, x: 1, y: 0 },
    { height: 15, x: 10, y: 10 },
  ]);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Obstacles</span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
      <span>
        {obstacles.map((obstacle) => (
          <GameObstacle height={obstacle.height} y={obstacle.y} x={obstacle.x} />
        ))}
      </span>
    </div>
  );
};
