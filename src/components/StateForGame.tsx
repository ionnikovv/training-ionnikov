import { useState } from 'react';

export const StateForGame = (): JSX.Element => {
  const [playerCoords, setPlayerCoords] = useState({ x: 0, y: 0 });
  //   x is const for player

  const [obstacleHeight, setObstacleHeight] = useState({ height: 0 });
  //   max-height for obstacle is height of player including jumping

  const [obstacleCoords, setObstacleCoords] = useState({ x: 0, y: 0 });
  //   after creating of component its 'y' will be a const

  const [backgroundSpeed, setBackgroundSpeed] = useState('50px');

  const [isPlaying, setIsPlaying] = useState(false);
  // is game started

  const [score, setScore] = useState('50px');
  // result of player`s game session
  const [record, setRecord] = useState(0);

  return <div>State</div>;
};
