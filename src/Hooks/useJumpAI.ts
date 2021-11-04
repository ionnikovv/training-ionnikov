import { useEffect, useRef, useState } from 'react';

type Props = {
  isGameStarted: boolean;
  isPaused: boolean;
  onChangePlayerCoord: React.Dispatch<React.SetStateAction<number>>;
};

export const useJumpKeyboad = ({ onChangePlayerCoord, isPaused, isGameStarted }: Props) => {
  const jumpProgressRef = useRef(0);
  const [callbacks, setCallbacks] = useState<null | Record<'handleJump' | 'handleBack', () => void>>(null);

  useEffect(() => {
    if (isPaused) return;

    return () => {};
  }, [onChangePlayerCoord, isGameStarted, isPaused]);
};
