import { useEffect, useRef, useState } from 'react';
import { TICK } from '../ConstantValues/ConstValues';
import { jumpCallbacks } from '../types/GameTypes';

type Props = {
  isPaused: boolean;
  onChangePlayerCoord: React.Dispatch<React.SetStateAction<number>>;
};

export const useJump = ({ onChangePlayerCoord, isPaused }: Props): jumpCallbacks => {
  const jumpProgressRef = useRef(0);
  const [callbacks, setCallbacks] = useState<jumpCallbacks>({});

  useEffect(() => {
    let intervalId: number | null = null;
    let returnIntervalId: number | null = null;
    const step = Math.PI / 60;
    if (isPaused) return;

    const handleJump = (event?: (TouchEvent | KeyboardEvent) | null) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!returnIntervalId) {
        returnIntervalId = setInterval(handleIntervalJump, TICK / 2) as unknown as number;
        handleIntervalJump();
        if (intervalId) clearInterval(intervalId);
      }
    };
    const handleIntervalJump = () => {
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
      returnIntervalId = setInterval(handleIntervalJump, TICK) as unknown as number;

    const handleBack = (event?: (TouchEvent | KeyboardEvent) | null) => {
      if (event instanceof KeyboardEvent && event.key !== ' ') return;
      if (!intervalId) {
        const handleIntervalBack = () => {
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
        intervalId = setInterval(handleIntervalBack, TICK / 2) as unknown as number;
        handleIntervalBack();
      }
    };
    setCallbacks({ handleJump, handleBack });
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (returnIntervalId) clearInterval(returnIntervalId);
    };
  }, [onChangePlayerCoord, isPaused]);

  return callbacks;
};
