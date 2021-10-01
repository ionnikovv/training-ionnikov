import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { useIntersectionObserver } from './Hooks/useOnScreen';
import { isPokemonResponse, PokemonsData } from './types/PokemonsData';

const PAGE_SIZE = 10;

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);
  const [lastPage, setLastPage] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const refObserver = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getPokemons() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${lastPage * PAGE_SIZE}`
      );
      const body = (await response.json()) as unknown;
      if (isPokemonResponse(body)) {
        setPokemons((prevPokemons) => [...prevPokemons, ...body.results]);
        setIsFetching(false);
      }
    }
    getPokemons();
  }, [lastPage]);

  const onIntersect = useCallback(() => {
    if (!isFetching) {
      setLastPage((prevLast) => prevLast + 1);
    }
  }, [isFetching]);

  useIntersectionObserver({
    ref: refObserver,
    onIntersect,
  });
  return (
    <div className='pokemon-wrapper'>
      <span className='pokemon-logo'>choose your pokemon!</span>
      <div className='pokemon-cards'>
        {pokemons.map((pokemonItem) => (
          <PokemonCard pokemonItem={pokemonItem} key={pokemonItem.name} />
        ))}
        <div ref={refObserver} className='observer-block'></div>
      </div>
    </div>
  );
}

export default App;
