export type PokemonsData = { name: string; url: string };
export type PokemonInfo = {
  weight: number;
  base_experience: number;
  height: number;
  id: number;
  sprites: { other: { dream_world: { front_default: string } } };
};
export type PokemonsResponse = {
  count: number;
  results: PokemonsData[];
};
export const isPokemonResponse = (json: unknown): json is PokemonsResponse => {
  return !!json && Boolean((json as PokemonsResponse).count);
};
export const isPokemonInfoResponse = (json: unknown): json is PokemonInfo => {
  return !!json && Boolean((json as PokemonInfo).id);
};
