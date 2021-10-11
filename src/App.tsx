import { useCallback, useEffect, useState } from 'react';
import { Loader } from './components/Common/Loader/Loader';
import { isPokemonResponse, PokemonsData } from './types/PokemonsData';
import './App.css';
import { useIntersectionObserver } from './Hooks/useOnScreen';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';

const PAGE_SIZE = 10;

export const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

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

  const onIntersect = useCallback(() => {
    setCurrentPage((prevLast) => prevLast + 1);
  }, []);

  useIntersectionObserver({
    ref,
    onIntersect,
    isDisabled: isFetching,
  });

  const onSelectPokemon = (pokemonName: string, isCurrentlySelected: boolean) => {
    const disabledPokemons = ['bulbasaur'];
    const selectedPokemonSize = 3;

    if (isCurrentlySelected) {
      setSelectedPokemons(selectedPokemons.filter((item) => item !== pokemonName));
    } else {
      if (disabledPokemons.includes(pokemonName)) return;
      if (selectedPokemons.length >= selectedPokemonSize) selectedPokemons.shift();
      setSelectedPokemons([...selectedPokemons, pokemonName]);
    }
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <div className='pokemon-wrapper'>
        <span className='pokemon-logo'>choose your pokemon!</span>
        <div className='pokemon-cards'>
          <SelectPokemons pokemons={pokemons} selectedPokemons={selectedPokemons} onSelectPokemon={onSelectPokemon} />
        </div>
        <div ref={setRef} className='observer-block' />
      </div>
    );
  }
};
