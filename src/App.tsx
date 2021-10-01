import { useEffect, useRef, useState } from 'react';
import './App.css';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { useOnScreen } from './Hooks/useOnScreen';
import { isPokemonResponse, PokemonsData } from './types/PokemonsData';

const PAGE_SIZE = 20;

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);
  const [lastPage, setLastPage] = useState(0);

  const refObserver = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getPokemons() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${lastPage * PAGE_SIZE}`);
      const body = (await response.json()) as unknown;
      if (isPokemonResponse(body)) {
        setPokemons((prevPokemons) => [...prevPokemons, ...body.results]);
        console.log('Pokemons were setted');
      } else throw new Error('Invalid Api Response!');
    }
    getPokemons();
  }, [lastPage]);

  useOnScreen({
    ref: refObserver,
    onScreen: () => {
      setLastPage((prevLast) => prevLast + 1);
    },
  });
  return (
    <div className='pokemon-wrapper'>
      <span className='pokemon-logo'>choose your pokemon!</span>
      <div className='pokemon-cards'>
        {pokemons?.map((pokemonItem) => (
          <PokemonCard pokemonItem={pokemonItem} key={pokemonItem.name} />
        ))}
        <div ref={refObserver} className='observer-block'></div>
      </div>
    </div>
  );
}

export default App;
