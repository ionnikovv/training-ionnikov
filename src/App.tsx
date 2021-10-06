import { useEffect, useState } from 'react';
import { Loader } from './components/Common/Loader/Loader';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { useIntersectionObserver } from './Hooks/useOnScreen';
import { isPokemonResponse, PokemonsData } from './types/PokemonsData';
import './App.css';
const PAGE_SIZE = 10;

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getPokemons() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${currentPage * PAGE_SIZE}`
      );
      const body = (await response.json()) as unknown;
      if (isPokemonResponse(body)) {
        setIsFetching(false);
        setPokemons((prevPokemons) => [...prevPokemons, ...body.results]);
      }
    }
    getPokemons();
  }, [currentPage]);

  const onIntersect = () => {
    setCurrentPage((prevLast) => prevLast + 1);
  };

  useIntersectionObserver({
    ref,
    onIntersect,
    isDisabled: isFetching,
  });

  if (isFetching) return <Loader />;

  return (
    <div className='pokemon-wrapper'>
      <span className='pokemon-logo'>choose your pokemon!</span>
      <div className='pokemon-cards'>
        {pokemons.map((pokemonItem) => (
          <PokemonCard pokemonItem={pokemonItem} key={pokemonItem.name} />
        ))}
        <div ref={setRef} className='observer-block' />
      </div>
    </div>
  );
}

export default App;
