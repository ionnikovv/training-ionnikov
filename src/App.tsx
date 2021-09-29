import { useEffect, useState } from 'react';
import './App.css';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { PokemonsData } from './types/PokemonsData';

function App(): JSX.Element {
  type PokemonsResponse = {
    count: number;
    next: string;
    previous: string;
    results: PokemonsData[];
  };

  const [pokemons, setPokemons] = useState<PokemonsData[]>();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      .then((response) => response.json())
      .then((response: PokemonsResponse) => {
        setPokemons(response.results);
      });
  }, []);

  // const ref = useRef(null);

  // useOnScreen(ref);

  return (
    <div className='App-wrapper'>
      <span className='is-logo'>choose your pokemon!</span>
      <div className='pokemon-cards'>
        {pokemons?.map((pokemonItem) => (
          <PokemonCard pokemonItem={pokemonItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
