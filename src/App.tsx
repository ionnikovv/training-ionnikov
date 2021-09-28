import { useEffect, useState } from 'react';
import './App.css';

function App(): JSX.Element {
  type PokemonsData = { name: string; url: string };

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

  return (
    <div className='App-wrapper'>
      <span className='is-logo'>infinity-scroll</span>
      <div className='pokemon-cards'>
        {pokemons?.map((pokemonItem: PokemonsData) => (
          <div className='pokemon-card' key={pokemonItem.name}>
            <span>{pokemonItem.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
