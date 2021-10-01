import './Loader.css';
import svg from './../../../three-dots.svg';

export function Loader(): JSX.Element {
  return (
    <div>
      <img className='loader' src={svg} alt='' />
    </div>
  );
}
