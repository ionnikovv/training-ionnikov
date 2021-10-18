import { useCallback, useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../ConstantValues/ConstValues';
import { useIntersectionObserver } from '../../Hooks/useOnScreen';
import { isPokemonResponse, PokemonsData } from '../../types/PokemonsData';
import { Loader } from '../Common/Loader/Loader';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './SelectPokemons.css';

type Props = {
  onSelectPokemon: (pokemon: PokemonsData, isCurrentlySelected: boolean) => void;
  selectedPokemons: string[];
};

export const SelectPokemons = ({ onSelectPokemon, selectedPokemons }: Props): JSX.Element => {
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

  const onIntersect = useCallback(() => {
    setCurrentPage((prevLast) => prevLast + 1);
  }, []);

  useIntersectionObserver({
    ref,
    onIntersect,
    isDisabled: isFetching,
  });

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <div className='pokemon-wrapper'>
        <span className='pokemon-logo'>choose your pokemon!</span>
        <div className='pokemon-cards'>
          {pokemons.map((pokemonItem) => {
            const isPokemonSelected = selectedPokemons.includes(pokemonItem.name);
            return (
              <PokemonCard
                pokemonItem={pokemonItem}
                key={pokemonItem.name}
                isPokemonSelected={isPokemonSelected}
                onClick={() => onSelectPokemon(pokemonItem, isPokemonSelected)}
              />
            );
          })}
        </div>
        <div ref={setRef} className='observer-block' />
      </div>
    );
  }
};
