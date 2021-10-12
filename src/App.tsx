import { useState } from 'react';
import './App.css';
import { Game } from './components/Game/Game';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';

export const App = (): JSX.Element => {
  const disabledPokemons = [''];
  const selectedPokemonSize = 1;
  const [isSelected, setIsSelected] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div className='main-wrapper'>
      {isSelected && (
        <div className='btn-start-wrapper'>
          <button
            className='btn-start'
            onClick={() => {
              setIsSelected(false);
              setIsGameStarted(true);
            }}
          >
            Start
          </button>
        </div>
      )}
      {isGameStarted ? (
        <Game />
      ) : (
        <SelectPokemons
          setIsSelected={() => setIsSelected((prevState) => !prevState)}
          selectedPokemonSize={selectedPokemonSize}
          disabledPokemons={disabledPokemons}
        />
      )}
    </div>
  );
};
