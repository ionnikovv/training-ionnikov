import { useEffect, useRef, useState } from 'react';
import { TICK } from '../ConstantValues/ConstValues';

type Props = {
  isGameStarted: boolean;
  isPaused: boolean;
  onChangePlayerCoord: React.Dispatch<React.SetStateAction<number>>;
};

export const useJump = ({
  onChangePlayerCoord,
  isPaused,
  isGameStarted,
}: Props): null | Record<'handleJump' | 'handleBack', () => void> => {
  const jumpProgressRef = useRef(0);
  const [callbacks, setCallbacks] = useState<null | Record<'handleJump' | 'handleBack', () => void>>(null);

  useEffect(() => {
    let intervalId: number | null = null;
    let returnIntervalId: number | null = null;
    const step = Math.PI / 60;
    if (isPaused) return;

    const handleJump = (event?: TouchEvent | Event | null | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!returnIntervalId) {
        returnIntervalId = setInterval(handleIntervalKeyUp, TICK) as unknown as number;
        handleIntervalKeyUp();
        if (intervalId) clearInterval(intervalId);
      }
    };
    const handleIntervalKeyUp = () => {
      if (jumpProgressRef.current > Math.PI && returnIntervalId !== null) {
        jumpProgressRef.current = 0;
        clearInterval(returnIntervalId);
        intervalId = null;
        returnIntervalId = null;
        return;
      }
      if (jumpProgressRef.current < Math.PI / 2) {
        const newProgress = Math.PI / 2 - jumpProgressRef.current;
        jumpProgressRef.current += newProgress * 2;
      }
      const coord = Math.abs(Math.sin(jumpProgressRef.current));
      onChangePlayerCoord(Math.floor(coord * -100));
      jumpProgressRef.current += step;
    };

    if (!isPaused && jumpProgressRef.current > 0)
      returnIntervalId = setInterval(handleIntervalKeyUp, TICK) as unknown as number;

    const handleBack = (event?: TouchEvent | Event | null | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!intervalId) {
        const handleIntervalKeydown = () => {
          if (jumpProgressRef.current > Math.PI && intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            jumpProgressRef.current = 0;
            if (returnIntervalId) clearInterval(returnIntervalId);
            returnIntervalId = null;
            return;
          }
          const coord = Math.abs(Math.sin(jumpProgressRef.current));

          onChangePlayerCoord(Math.floor(coord * -100));
          jumpProgressRef.current += step;
        };
        intervalId = setInterval(handleIntervalKeydown, TICK) as unknown as number;
        handleIntervalKeydown();
      }
    };
    setCallbacks({ handleJump, handleBack });
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (returnIntervalId) clearInterval(returnIntervalId);
    };
  }, [onChangePlayerCoord, isGameStarted, isPaused]);
  return callbacks;
};
