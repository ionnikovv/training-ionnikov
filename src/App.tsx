import { useEffect, useRef, useState } from 'react';
import './App.css';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { useOnScreen } from './Hooks/useOnScreen';
import { PokemonsData } from './types/PokemonsData';

type PokemonsResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonsData[];
};

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<PokemonsData[]>();
  const [pokemonsCountLimit, setPokemonsCountLimit] = useState<number>(10);
  const refObserver = useRef<HTMLDivElement>(null);
  const onScreen: boolean = useOnScreen({ ref: refObserver });

  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsCountLimit}&offset=0`)
  //     .then((response) => response.json())
  //     .then((response: PokemonsResponse) => {
  //       setPokemons(response.results);
  //     });
  //   console.log(`Startup`);
  // }, [pokemonsCountLimit]);

  useEffect(() => {
    if (onScreen) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsCountLimit}&offset=0`)
        .then((response) => response.json())
        .then((response: PokemonsResponse) => {
          setPokemons(response.results);

          console.log(`updated`);
          setPokemonsCountLimit((prevCount) => prevCount + 10);
          // console.log(`Count of limit ${pokemonsCountLimit}`);
          // // eslint-disable-next-line no-debugger
          // debugger;
        });
    }
  }, [onScreen, pokemonsCountLimit]);

  return (
    <div className='pokemon-wrapper'>
      <span className='pokemon-logo'>choose your pokemon!</span>
      <div className='pokemon-cards'>
        {pokemons?.map((pokemonItem) => (
          <PokemonCard pokemonItem={pokemonItem} key={pokemonItem.name} />
        ))}
      </div>
      <div ref={refObserver} className='observer-block'></div>
    </div>
  );
}

export default App;
