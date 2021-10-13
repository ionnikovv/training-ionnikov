type Props = {
  height: number;
  coordX: number;
};

export const Obstacle = ({ height, coordX }: Props): JSX.Element => {
  return (
    <div>
      Obstacle, {height} coordX {coordX}
    </div>
  );
};
