import { useState } from 'react';

export const StateForGame = (): JSX.Element => {
  const [playerJumpValue] = useState(100);

  const [obstacleHeight] = useState({ height: 0 });

  const [obstacleCoords] = useState({ x: 0 });

  const backgroundSpeed = 50;

  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerJumpValue}</span>
      <span>height of obstacle: {obstacleHeight.height}</span>
      <span>Coords of obstacle transition: {obstacleCoords.x}</span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
