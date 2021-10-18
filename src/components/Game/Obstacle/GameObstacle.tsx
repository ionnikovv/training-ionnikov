import './Obstacle.css';

type Props = {
  height: number;
  x: number;
  y: number;
};

export const GameObstacle = ({ height, x, y }: Props): JSX.Element => {
  return (
    <div className='obstacle-wrapper'>
      <div>
        {height}
        {x}
        {y}
      </div>
    </div>
  );
};
