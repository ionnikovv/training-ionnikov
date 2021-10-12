import { useState } from 'react';
import { backgroundSpeed } from '../ConstantValues/ConstValues';

export const StateForGame = (): JSX.Element => {
  const [playerCoord] = useState(100);
  const [obstaclesOnScreen] = useState([true, true]);
  const [obstacleHeight] = useState(0);
  const [obstacleShifting] = useState(50);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerCoord}</span>
      <span>Height of obstacle: {obstacleHeight}</span>
      <span>Count of obstacles on screen :{obstaclesOnScreen}</span>
      <span>Coords of obstacle shifting: {obstacleShifting}</span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
