import { useState } from 'react';

export const StateForGame = (): JSX.Element => {
  const [playerJumpValue] = useState(100);

  const [obstacleHeight] = useState(0);

  const [obstacleShifting] = useState(50);

  const backgroundSpeed = 50;

  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerJumpValue}</span>
      <span>height of obstacle: {obstacleHeight}</span>
      <span>Coords of obstacle transition: {obstacleShifting}</span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
