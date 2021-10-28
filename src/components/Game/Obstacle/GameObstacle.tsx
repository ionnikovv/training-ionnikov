import './Obstacle.css';
import { ObstacleEntity } from '../../../types/GameObstacle';

type Props = ObstacleEntity;

export const GameObstacle = ({ height, x, y }: Props): JSX.Element => {
  const convertToCssUnits = (valueToConvert: number): string | undefined => `${valueToConvert}%`;
  const ObstacleTransition = {
    left: convertToCssUnits(x),
    height: convertToCssUnits(height),
    transform: `translate(0, ${-y}%)`,
  };
  return <div className='obstacle-wrapper' style={ObstacleTransition}></div>;
};
