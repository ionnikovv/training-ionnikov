import './Obstacle.css';
import { ObstacleEntity } from '../../../types/GameObstacle';

type Props = ObstacleEntity;

export const GameObstacle = ({ height, x }: Props): JSX.Element => {
  const convertToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert}%`;
  };
  const convertHeightToCssUnits = (valueToConvert: number): string | undefined => {
    return `${valueToConvert}vmin`;
  };
  const ObstacleTransition = {
    left: convertToCssUnits(x),
    height: convertHeightToCssUnits(height),
    transition: 'all 0.005s'
  };
  return <div className='obstacle-wrapper' style={ObstacleTransition}></div>;
};
