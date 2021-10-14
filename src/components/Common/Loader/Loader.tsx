import './Loader.css';
import svg from './../../../assets/three-dots.svg';

export function Loader(): JSX.Element {
  return (
    <div className='loader-wrapper'>
      <img className='loader' src={svg} alt='' />
    </div>
  );
}
