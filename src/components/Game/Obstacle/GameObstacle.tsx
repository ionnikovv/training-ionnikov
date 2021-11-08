import './Obstacle.css';
import { ObstacleEntity } from '../../../types/GameObstacle';

type Props = ObstacleEntity;

export const GameObstacle = ({ height, x }: Props): JSX.Element => {
  const convertToCssUnits = (valueToConvert: number): string | undefined => `${valueToConvert}%`;

  const ObstacleTransition = {
    left: convertToCssUnits(x),
    height: convertToCssUnits(height),
  };
  return <div className='obstacle-wrapper' style={ObstacleTransition}></div>;
};
