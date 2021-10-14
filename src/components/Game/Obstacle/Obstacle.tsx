import './Obstacle.css';

type Props = {
  height: number;
  coordX: number;
};

export const Obstacle = (): JSX.Element => {
  return (
    <div className='obstacle-wrapper'>
      <div></div>
    </div>
  );
};
