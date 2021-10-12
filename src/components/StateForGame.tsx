import { useState } from 'react';
import { backgroundSpeed } from '../ConstantValues/ConstValues';
import { Obstacle } from './Game/Obstacle/Obstacle';

export const StateForGame = (): JSX.Element => {
  const [playerCoord] = useState(100);
  const [obstaclesOnScreen] = useState([10, 20, 30]);
  //   this array consist of each obstacle`s height
  const [obstacleShifting] = useState(50);
  const [isPlaying] = useState(false);

  return (
    <div>
      <span>Player jump value: {playerCoord}</span>
      <span>count of obstacles and their height : {obstaclesOnScreen}</span>
      <span>Count of obstacles on screen :{obstaclesOnScreen}</span>
      <span>Coords of obstacle shifting: {obstacleShifting}</span>
      <span>Speed of transition of background: {backgroundSpeed}</span>
      <span>Is game started: {isPlaying}</span>
    </div>
  );
};
