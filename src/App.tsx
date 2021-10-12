import './App.css';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';

export const App = (): JSX.Element => {
  const disabledPokemons = [''];
  const selectedPokemonSize = 1;

  return (
    <div className='pokemon-wrapper'>
      <SelectPokemons selectedPokemonSize={selectedPokemonSize} disabledPokemons={disabledPokemons} />
    </div>
  );
};
